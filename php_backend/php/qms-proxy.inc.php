<?php
/**
 * Общая логика QMS-прокси. Подключается из proxy.php / proxy-spb.php.
 * Перед require задайте: $qmsProxyConfigFile = __DIR__ . '/config.php';
 */
if (!isset($qmsProxyConfigFile)) {
    $qmsProxyConfigFile = __DIR__ . '/config.php';
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, apikey, token, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$config = file_exists($qmsProxyConfigFile)
    ? (require $qmsProxyConfigFile)
    : [];

$endpoint = $_GET['endpoint'] ?? $_GET['action'] ?? '';
if ($endpoint === '') {
    http_response_code(400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'No endpoint specified']);
    exit;
}

function qms_proxy_build_url(array $config, string $endpoint): string
{
    if ($endpoint === 'getPr') {
        if (!empty($config['price_api_url'])) {
            return (string) $config['price_api_url'];
        }
        $qmsApi = $config['qms_api_url'] ?? '';
        if ($qmsApi !== '') {
            return rtrim($qmsApi, '/') . '/getPr';
        }
    }

    if (!empty($config['endpoint_urls'][$endpoint])) {
        return (string) $config['endpoint_urls'][$endpoint];
    }

    $base = $config['api_url'] ?? '';
    if ($base === '') {
        return '';
    }

    return rtrim($base, '/') . '/' . $endpoint . '/';
}

$url = qms_proxy_build_url($config, $endpoint);
if ($url === '') {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'config: задайте api_url (и qms_api_url для getPr)']);
    exit;
}

$postData = file_get_contents('php://input');
$headersList = array_change_key_case(getallheaders() ?: [], CASE_LOWER);

$contentType = $headersList['content-type'] ?? (
    $endpoint === 'getPr' ? 'application/json' : 'application/x-www-form-urlencoded'
);

$forwardHeaders = ['Content-Type: ' . $contentType];
if (isset($headersList['apikey'])) {
    $forwardHeaders[] = 'apikey: ' . $headersList['apikey'];
}
if (isset($headersList['token'])) {
    $forwardHeaders[] = 'token: ' . $headersList['token'];
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, $forwardHeaders);
curl_setopt($ch, CURLOPT_TIMEOUT, 90);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Proxy cURL error', 'detail' => $curlError]);
    exit;
}

http_response_code($httpCode ?: 200);
echo $response;
