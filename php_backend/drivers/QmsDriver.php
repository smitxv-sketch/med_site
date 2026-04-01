<?php declare(strict_types=1);

require_once __DIR__ . '/../interfaces/MisInterface.php';
require_once __DIR__ . '/../services/AsyncHttpService.php';
require_once __DIR__ . '/qms/QmsNormalizer.php';

/**
 * Class QmsDriver
 * Layer: EXTRACT
 * Responsibility: Communicate with QMS API using Async HTTP.
 */
class QmsDriver implements MisInterface {
    
    private array $qmsConfig;
    private AsyncHttpService $httpService;
    private QmsNormalizer $normalizer;

    public function __construct(array $fullConfig, AsyncHttpService $httpService) {
        $this->qmsConfig = $fullConfig['qms'] ?? [];
        $this->httpService = $httpService;
        $this->normalizer = new QmsNormalizer($this->qmsConfig['branches_map'] ?? []);
    }

    public function getDoctorsBySpecialty($cityCode, $specialty, $sessionId, $dimensions = []): array {
        // 1. ROUTING
        $targetInstances = $this->resolveTargetInstances((string)$cityCode, $dimensions['routing'] ?? []);

        if (empty($targetInstances)) {
            return [];
        }

        // 2. QUERY OPTIMIZATION
        $queryParams = $dimensions['query'] ?? [];
        if (!empty($dimensions['branch'])) {
             $queryParams['qqc244branch'] = (string)$dimensions['branch'];
        } elseif (!empty($dimensions['routing']['allowed_branches']) && count($dimensions['routing']['allowed_branches']) === 1) {
             $queryParams['qqc244branch'] = (string)reset($dimensions['routing']['allowed_branches']);
        }

        // 3. TRANSPORT
        $rawResponses = $this->fetchFromInstances($targetInstances, (string)$specialty, (string)$sessionId, $queryParams);

        // 4. NORMALIZATION
        $candidates = $this->normalizer->normalizeResponses($rawResponses, (string)$specialty);

        // 5. FILTERING
        $filteredCandidates = $this->applyDimensionalFilters($candidates, $dimensions['filtering'] ?? [], $dimensions['routing'] ?? []);

        // 6. ENRICHMENT (Lotus Mode)
        $enrichedCandidates = $this->enrichWithPreviewSlots($filteredCandidates, $targetInstances, (string)$specialty, (string)$sessionId);

        // 7. AGGREGATION
        return $this->normalizer->groupOfferings($enrichedCandidates, (string)$cityCode);
    }

    public function getAllDoctorsFromMis($cityCode): array {
        $specialties = $this->getSpecialties((string)$cityCode);
        
        if (empty($specialties)) {
            return [];
        }

        $instances = $this->getInstancesByCity((string)$cityCode);
        if (empty($instances)) return [];

        $requests = [];
        $batchLimit = $this->qmsConfig['api_common']['batch_limit'] ?? 30;
        $dummySessionId = $this->qmsConfig['api_common']['dummy_session_id'] ?? 999;

        foreach ($specialties as $idx => $specName) {
            if ($idx > $batchLimit) break; 

            foreach ($instances as $dbKey => $instance) {
                $reqKey = "{$dbKey}_batch_{$idx}";
                $requests[$reqKey] = [
                    'url' => rtrim($instance['api_url'], '/') . '/getslotsbyspec/',
                    'content_type' => 'form', 
                    'body' => [
                        'apikey' => $instance['api_token'],
                        'chatid' => $dummySessionId,
                        'spec' => $specName
                    ],
                    'headers' => ['apikey: ' . $instance['api_token']]
                ];
            }
        }

        $rawResponses = $this->httpService->execute($requests, 10); 
        $flatCandidates = $this->normalizer->normalizeResponses($rawResponses, '');
        return $this->normalizer->groupOfferings($flatCandidates, (string)$cityCode);
    }

    private function enrichWithPreviewSlots(array $candidates, array $instances, string $specialty, string $sessionId): array {
        if (empty($candidates)) return [];

        $datesToCheck = [];
        for ($i = 0; $i < 14; $i++) {
            $datesToCheck[] = date('Ymd', strtotime("+$i days"));
        }

        $scheduleRequests = [];
        
        foreach ($instances as $dbKey => $instance) {
            foreach ($datesToCheck as $date) {
                $reqKey = "sched_{$dbKey}_{$date}";
                
                $scheduleRequests[$reqKey] = [
                    'url' => rtrim($instance['api_url'], '/') . '/getslotsbyspec/',
                    'content_type' => 'form',
                    'body' => [
                        'apikey' => $instance['api_token'],
                        'chatid' => (int)$sessionId,
                        'spec'   => $specialty,
                        'day'    => $date
                    ]
                ];
            }
        }

        $responses = $this->httpService->execute($scheduleRequests, 6); 
        $scheduleMap = []; 

        foreach ($responses as $key => $res) {
            if (!$res['success']) continue;
            
            if (preg_match('/^sched_(.*)_(\d{8})$/', $key, $m)) {
                $dbKey = $m[1];
                $date = $m[2];
                $data = $res['data']['slots'] ?? [];

                if (isset($res['data']['slots']['schedule'])) {
                    $data = [$res['data']['slots']];
                }

                if (!is_array($data)) continue;

                foreach ($data as $docBlock) {
                    $docId = $docBlock['qqc'] ?? null;
                    if (!$docId) continue;
                    
                    $slots = $docBlock['schedule'] ?? [];
                    if (!empty($slots) && is_array($slots)) {
                        foreach ($slots as $s) {
                            $scheduleMap[$dbKey][$docId][$date][] = [
                                'id' => uniqid('s'), 
                                'time' => $s['time'],
                                'date' => $s['day2say'] ?? $date, 
                                'time2appoint' => $s['time2appoint'],
                                'isAvailable' => true,
                                'price' => $s['price']
                            ];
                        }
                    }
                }
            }
        }

        foreach ($candidates as &$doc) {
            $db = $doc['databaseId'];
            $id = $doc['qmsId'];
            
            $doc['slots_preview'] = [
                'dates' => [],
                'slots' => [],
                'nearestDate' => null
            ];

            if (isset($scheduleMap[$db][$id])) {
                foreach ($scheduleMap[$db][$id] as $date => $slots) {
                    $doc['slots_preview']['dates'][] = $date;
                    $doc['slots_preview']['slots'][$date] = $slots;
                }
            }
        }

        return $candidates;
    }

    public function getSpecialties($cityCode, $branchId = null): array {
        $qmsBranchCode = $branchId ? (string)$branchId : '';
        $instance = $this->getPrimaryInstance((string)$cityCode);
        
        if (!$instance) return [];

        try {
            $params = $qmsBranchCode ? ['qqc244' => $qmsBranchCode] : ['qqc244' => ''];
            $response = $this->makeRequest($instance, 'spec_list', $params);
            
            $specs = $response['spec'] ?? [];
            if (is_array($specs)) sort($specs);
            
            return is_array($specs) ? $specs : [];

        } catch (Exception $e) {
            error_log("QmsDriver: Failed to fetch specialties: " . $e->getMessage());
            return [];
        }
    }

    public function getDoctorCalendar($dbKey, $docId, $specialty, $sessionId): array {
        $instance = $this->getInstance($dbKey);
        
        $params = [
            'chatid' => (int)$sessionId,
            'spec' => $specialty,
            'qqc244' => $docId,
            'qqc244branch' => $this->extractBranchCode((string)$docId)
        ];
        $res = $this->makeRequest($instance, 'getslotsbyspec', $params);
        return $res['slots'] ?? [];
    }

    public function getDoctorSlots($dbKey, $docId, $date, $specialty, $sessionId): array {
        $instance = $this->getInstance($dbKey);
        $params = [
            'chatid' => (int)$sessionId,
            'spec' => $specialty,
            'qqc244' => $docId,
            'qqc244branch' => $this->extractBranchCode((string)$docId),
            'day' => $date
        ];
        $response = $this->makeRequest($instance, 'getslotsbyspec', $params);
        if (isset($response['slots'][0]['schedule'])) {
            return $response['slots'][0]['schedule'];
        }
        return [];
    }

    public function checkPatientExists($dbKey, $p, $sid) { return false; }
    public function sendVerificationCode($dbKey, $p, $sid) { return true; }
    
    public function createAppointment($data, $sid): array { 
        $instance = $this->getInstance($data['databaseId']);
        
        $payload = [
            'chatid' => (int)$sid,
            'phone' => $data['patient']['phone'],
            'fio' => $data['patient']['fullName'],
            'birthdate' => $data['patient']['birthDate'],
            'doc' => $data['doctor']['qmsId'],
            'date' => $data['slot']['date'], 
            'time' => $data['slot']['time2appoint'] ?? $data['slot']['time']
        ];

        $response = $this->makeRequest($instance, 'appointByFIO', $payload);
        
        if (isset($response['result']) && $response['result'] === 'success') {
            return ['success' => true, 'data' => $response];
        } else {
            return ['success' => false, 'error' => $response['error'] ?? 'Unknown error from QMS'];
        }
    }

    // --- HELPERS ---

    private function extractBranchCode(string $docQq): string {
        $map = $this->qmsConfig['branches_map'] ?? [];
        foreach ($map as $code => $info) {
            if (strpos($docQq, (string)$code) === 0) return (string)$code;
        }
        return '';
    }

    private function resolveTargetInstances(string $cityCode, array $routingRules): array {
        $targets = array_filter($this->qmsConfig['instances'] ?? [], function($inst) use ($cityCode) {
            return isset($inst['city_code']) && $inst['city_code'] === $cityCode;
        });

        if (!empty($routingRules['allowed_instances'])) {
            $allowed = array_flip($routingRules['allowed_instances']);
            $targets = array_intersect_key($targets, $allowed);
        }

        if (!empty($routingRules['excluded_instances'])) {
            foreach ($routingRules['excluded_instances'] as $ex) {
                unset($targets[$ex]);
            }
        }

        return $targets;
    }

    private function fetchFromInstances(array $instances, string $specialty, string $sessionId, array $queryParams): array {
        $requests = [];
        $normalizedSpec = trim($specialty); 
        
        // [FIXED] SAFE ID DETECTION (ASCII ONLY)
        $isIdLookup = (stripos($normalizedSpec, 'qqc') === 0) || (strlen($normalizedSpec) > 8 && preg_match('/^[A-Za-z0-9]+$/', $normalizedSpec));

        foreach ($instances as $dbKey => $instance) {
            $baseBody = [
                'apikey' => $instance['api_token'],
                'chatid' => (int)$sessionId
            ];

            if (!empty($queryParams)) {
                $baseBody = array_merge($baseBody, $queryParams);
            }

            $contentType = 'form'; 
            $headers = ['apikey: ' . $instance['api_token']]; 

            if ($isIdLookup) {
                // ID Lookup
                $requests[$dbKey . '_id'] = [
                    'url' => rtrim($instance['api_url'], '/') . '/getslotsbyspec/',
                    'content_type' => $contentType,
                    'body' => array_merge($baseBody, [
                        'qqc244' => $normalizedSpec,
                        'spec' => '' 
                    ]),
                    'headers' => $headers
                ];
            } else {
                // Standard Search
                $requests[$dbKey . '_spec'] = [
                    'url' => rtrim($instance['api_url'], '/') . '/getslotsbyspec/',
                    'content_type' => $contentType,
                    'body' => array_merge($baseBody, ['spec' => $normalizedSpec]),
                    'headers' => $headers
                ];

                if (mb_strlen($normalizedSpec) >= 3) {
                    $requests[$dbKey . '_fio'] = [
                        'url' => rtrim($instance['api_url'], '/') . '/searchdocbyfio/',
                        'content_type' => $contentType,
                        'body' => array_merge($baseBody, ['fio' => $normalizedSpec]),
                        'headers' => $headers
                    ];
                }
            }
        }

        return $this->httpService->execute($requests, $this->qmsConfig['api_common']['timeout'] ?? 5);
    }

    private function applyDimensionalFilters(array $candidates, array $filterRules, array $routingRules): array {
        if (empty($candidates)) return [];

        return array_filter($candidates, function($item) use ($filterRules, $routingRules) {
            if (!empty($routingRules['allowed_branches'])) {
                if (!in_array($item['branchCode'], $routingRules['allowed_branches'])) {
                    return false;
                }
            }
            return true;
        });
    }

    private function getPrimaryInstance(string $cityCode) {
        if (!isset($this->qmsConfig['instances'])) return null;
        foreach ($this->qmsConfig['instances'] as $inst) {
            if (isset($inst['city_code']) && $inst['city_code'] === $cityCode && !empty($inst['is_primary'])) {
                return $inst;
            }
        }
        $cityInstances = $this->getInstancesByCity($cityCode);
        return !empty($cityInstances) ? reset($cityInstances) : null;
    }

    private function getInstancesByCity(string $cityCode): array {
        return array_filter($this->qmsConfig['instances'] ?? [], function($inst) use ($cityCode) {
            return isset($inst['city_code']) && $inst['city_code'] === $cityCode;
        });
    }

    private function getInstance($dbKey) {
        if (!isset($this->qmsConfig['instances'][$dbKey])) throw new Exception("Instance not found: $dbKey");
        return $this->qmsConfig['instances'][$dbKey];
    }

    private function makeRequest($instance, $endpoint, $bodyParams) {
        $url = rtrim($instance['api_url'], '/') . '/' . $endpoint . '/';
        $ch = curl_init();
        
        $bodyParams['apikey'] = $instance['api_token'];
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($bodyParams));
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded',
            'apikey: ' . $instance['api_token'] 
        ]);
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        // [FIXED] Use config timeout (default 60s) instead of hardcoded 15s
        $timeout = $this->qmsConfig['api_common']['timeout'] ?? 60;
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $res = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($code !== 200) throw new Exception("API Error $code");
        
        $json = json_decode($res, true);
        if (!$json) throw new Exception("Invalid JSON from QMS");
        
        return $json;
    }
}
