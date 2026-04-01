<?php
/**
 * Smart PHP Proxy for Medical Booking Widget
 * 
 * Handles specific API logic for QMS/Integration:
 * - Maps 'action' to specific endpoints
 * - Handles JSON vs x-www-form-urlencoded differences
 * - Injects API key from config
 */

// --- LOAD CONFIG ---
$config = [];
if (file_exists('config.php')) {
    $config = include('config.php');
}

// Defaults
$API_BASE_URL = $config['api_url'] ?? 'https://back.cispb.ru/robot-dev';
$API_KEY = $config['api_key'] ?? '';
$CHAT_ID = $config['chat_id'] ?? '777777777777';

// --- HEADERS ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key, token");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// --- INPUT PROCESSING ---
$action = $_GET['action'] ?? '';
$incomingKey = '';

// Try to find key in request if not in config
if (empty($API_KEY)) {
    $headers = getallheaders();
    // Case-insensitive header search
    $headers = array_change_key_case($headers, CASE_LOWER);
    $incomingKey = $headers['token'] ?? $headers['authorization'] ?? $_GET['token'] ?? $_GET['key'] ?? '';
    if (strpos($incomingKey, 'Bearer ') === 0) {
        $incomingKey = substr($incomingKey, 7);
    }
    if ($incomingKey) {
        $API_KEY = $incomingKey;
    }
}

if (empty($API_KEY)) {
    http_response_code(400);
    echo json_encode(['error' => 'API Key missing. Configure in config.php or pass as token/header.']);
    exit;
}

// --- ROUTING LOGIC ---
$targetUrl = $API_BASE_URL;
$contentType = 'application/json';
$postData = [];

switch ($action) {
    case 'services':
    case 'getServicesToAppoint':
        // POST /getServicesToAppoint
        // CHANGED: Using x-www-form-urlencoded based on developer comment that JSON was incorrect
        $targetUrl = rtrim($API_BASE_URL, '/') . '/getServicesToAppoint';
        $contentType = 'application/x-www-form-urlencoded';
        $postData = [
            'apikey' => $API_KEY,
            'unauthorized' => 1
        ];
        break;

    case 'doctors':
    case 'spec_list':
        // POST /spec_list/ (x-www-form-urlencoded)
        $targetUrl = rtrim($API_BASE_URL, '/') . '/spec_list/';
        $contentType = 'application/x-www-form-urlencoded';
        $postData = [
            'apikey' => $API_KEY,
            'chatid' => $CHAT_ID
        ];
        break;

    case 'slots':
    case 'getslotsbyspec':
        // POST /getslotsbyspec/ (x-www-form-urlencoded)
        $targetUrl = rtrim($API_BASE_URL, '/') . '/getslotsbyspec/';
        $contentType = 'application/x-www-form-urlencoded';
        $spec = $_GET['spec'] ?? '';
        $postData = [
            'apikey' => $API_KEY,
            'spec' => $spec,
            'chatid' => $CHAT_ID
        ];
        break;

    default:
        http_response_code(400);
        echo json_encode([
            'error' => 'Unknown action', 
            'valid_actions' => ['services', 'doctors', 'slots'],
            'received_action' => $action
        ]);
        exit;
}

// --- EXECUTE REQUEST ---
$ch = curl_init($targetUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Uncomment if needed

if ($contentType === 'application/json') {
    $payload = json_encode($postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
} else {
    // x-www-form-urlencoded
    $payload = http_build_query($postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/x-www-form-urlencoded',
        'Content-Length: ' . strlen($payload)
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
}

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['error' => 'Proxy cURL Error', 'details' => $curlError]);
} else {
    http_response_code($httpCode);
    // Try to detect content type of response, default to json
    header('Content-Type: application/json');
    echo $response;
}
?>
