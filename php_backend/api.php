<?php
// API Gateway Entry Point v3.9.1

// 1. HARDCORE ERROR TRAPPING & CLEANING
// Turn on buffering immediately to catch any stray whitespace from includes
ob_start();

error_reporting(E_ALL);
ini_set('display_errors', '0'); 
ini_set('log_errors', '1');

// Diagnostic Mode (Dry Run)
if (defined('API_DRY_RUN')) return;

// --- CACHE CONTROL HEADERS (NO-CACHE) ---
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
// ----------------------------------------

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Key');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        // Clean any partial output before sending error JSON
        if (ob_get_length()) ob_clean();
        
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Critical Server Error',
            'debug_info' => $error
        ], JSON_UNESCAPED_UNICODE | JSON_PARTIAL_OUTPUT_ON_ERROR);
    }
});

try {
    // Check config existence
    if (!file_exists(__DIR__ . '/config_access.php')) {
        throw new Exception('Config access missing. Rename config_access.example.php!');
    }

    $config = require __DIR__ . '/config.php';
    
    // Autoload
    require_once __DIR__ . '/services/AsyncHttpService.php'; 
    require_once __DIR__ . '/core/Sanitizer.php';
    require_once __DIR__ . '/core/Router.php';
    require_once __DIR__ . '/core/Logger.php';
    require_once __DIR__ . '/core/Cache.php';
    require_once __DIR__ . '/core/Hydrator.php';
    require_once __DIR__ . '/interfaces/MisInterface.php';
    require_once __DIR__ . '/drivers/QmsDriver.php';
    require_once __DIR__ . '/drivers/OneCDriver.php'; 
    
    require_once __DIR__ . '/controllers/BookingController.php';
    require_once __DIR__ . '/controllers/CatalogController.php';
    require_once __DIR__ . '/controllers/ScheduleController.php';
    require_once __DIR__ . '/controllers/SearchController.php';
    require_once __DIR__ . '/controllers/DebugController.php';

    $isDebugMode = isset($_GET['debug']) && $_GET['debug'] == '1';
    $sanitizer = new Sanitizer($config['security'] ?? []);
    $logger = new Logger($sanitizer);
    $cache = new Cache($config['cache'] ?? ['enabled' => true, 'path' => __DIR__ . '/cache']);
    $httpService = new AsyncHttpService($sanitizer, $isDebugMode);
    
    $getDb = function() use ($config) {
        return $config['helpers']['get_db_conn']($config);
    };
    $hydrator = new Hydrator($config);

    $driverType = $config['features']['mis_driver'] ?? 'qms';
    $gateway = ($driverType === '1c') ? new OneCDriver($config, $httpService) : new QmsDriver($config, $httpService);

    // Controllers
    $catalogController = new CatalogController($gateway, $hydrator, $cache, $config);
    $scheduleController = new ScheduleController($gateway, $cache, $logger);
    $bookingController = new BookingController($gateway, $logger, $getDb, $config['cms_db']['prefix'] ?? 'wp_', $config['recaptcha'] ?? [], $config['compliance'] ?? []);
    $searchController = new SearchController($gateway, $hydrator, $logger, $cache);
    $debugController = new DebugController($gateway, $getDb, $config);

    // Routing
    $router = new Router();
    $action = $_GET['action'] ?? '';

    $router->register('get_config', function() use ($config, $isDebugMode) {
        return [
            'success' => true, 
            'data' => [
                'theme' => $config['theme'],
                'topology' => $config['topology'],
                'behavior' => $config['behavior'],
                'compliance' => $config['compliance'],
                'localization' => $config['localization'] ?? [],
                'debug' => ['allowed' => $isDebugMode]
            ]
        ];
    });

    $router->register('get_structure', [$catalogController, 'getStructure']);
    $router->register('get_specialties', [$catalogController, 'getSpecialties']);
    $router->register('get_doctors', [$catalogController, 'getDoctors']);
    $router->register('get_branches', [$catalogController, 'getBranches']); 
    $router->register('get_slots', [$scheduleController, 'getSlots']);
    $router->register('check_slot', [$scheduleController, 'checkSlot']); 
    $router->register('get_calendar', [$scheduleController, 'getCalendar']);
    $router->register('book', [$bookingController, 'book']);
    $router->register('join_waitlist', [$bookingController, 'joinWaitlist']);
    $router->register('smart_search', [$searchController, 'handleSearch']);
    $router->register('debug_hydrator', [$debugController, 'inspect']);
    
    $router->register('admin_clear_cache', function() use ($cache, $config) {
        $key = $_SERVER['HTTP_X_ADMIN_KEY'] ?? '';
        $validKey = $config['admin_secret'] ?? 'no_secret_set';
        if ($key !== $validKey) throw new Exception("Unauthorized", 401);
        $cache->flush();
        return ['message' => 'Cache cleared'];
    });
    
    $router->register('admin_check_auth', function() use ($config) {
        $key = $_SERVER['HTTP_X_ADMIN_KEY'] ?? '';
        $validKey = $config['admin_secret'] ?? 'no_secret_set';
        return ['valid' => $key === $validKey];
    });

    if (empty($action)) throw new Exception("No action specified");

    $response = $router->dispatch($action);
    
    // CRITICAL: Clean buffer before outputting JSON
    // This removes any accidental whitespace or warnings echoed before this point
    if (ob_get_length()) ob_clean();

    if (is_array($response) && !isset($response['success'])) {
        $finalData = ['success' => true, 'data' => $response];
    } elseif (is_array($response)) {
        $finalData = $response;
    } else {
        $finalData = ['success' => true];
    }

    if ($isDebugMode) {
        $finalData['_debug_trace'] = $httpService->getDebugTrace();
        $finalData['_debug_logs'] = $logger->getMemoryLogs();
    }

    echo json_encode($finalData, JSON_UNESCAPED_UNICODE | JSON_PARTIAL_OUTPUT_ON_ERROR);

} catch (Throwable $e) {
    if (ob_get_length()) ob_clean();
    http_response_code(200); 
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'debug_info' => [
            'file' => basename($e->getFile()),
            'line' => $e->getLine()
        ]
    ], JSON_UNESCAPED_UNICODE | JSON_PARTIAL_OUTPUT_ON_ERROR);
}
