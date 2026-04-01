<?php
// PART 1: INFRASTRUCTURE & ACCESS
// Секреты и доступы. Подгружает данные из config_access.php

$accessFile = __DIR__ . '/../config_access.php';
$secrets = [];

if (file_exists($accessFile)) {
    $secrets = require $accessFile;
} else {
    $secrets = [
        'cms_db' => ['host'=>'', 'dbname'=>'', 'user'=>'', 'password'=>'', 'prefix'=>'wp_'],
        'qms_instances' => [],
        'recaptcha' => []
    ];
}

$processedInstances = [];
if (!empty($secrets['qms_instances'])) {
    foreach ($secrets['qms_instances'] as $key => $inst) {
        $inst['content_type'] = 'form'; 
        $processedInstances[$key] = $inst;
    }
}

return [
    'cms' => [
        'connection_type' => $secrets['cms_connection_type'] ?? 'database',
        'db' => $secrets['cms_db'],
        'api' => [
            'endpoint' => $secrets['cms_api_url'] ?? 'https://yoursite.ru/wp-json/medical-os/v1/doctors',
            'token' => $secrets['cms_api_token'] ?? '', 
            'timeout' => 5
        ],
        'json_path' => __DIR__ . '/../data/doctors_registry.json'
    ],
    
    'qms' => [
        'instances' => $processedInstances,
        'api_common' => [
            // UPDATED: Increased timeout and batch limit for production load
            'timeout' => 60, 
            'batch_delay_us' => 50000, // 50ms delay
            'batch_limit' => 100,      // Allow fetching more specialties at once
            'dummy_session_id' => 999
        ],
        'branches_map' => [
            'ТACdAAC' => [
                'name' => 'Взрослая поликлиника',
                'address' => 'ул. 40-летия Победы, 11',
                'short' => '40 лет Победы',
            ],
            'ТACdAAD' => [
                'name' => 'Детская поликлиника',
                'address' => 'ул. 40-летия Победы, 11',
                'short' => '40 лет Победы',
            ],
            'ТACdAAQ' => [
                'name' => 'Взрослая поликлиника',
                'address' => 'ул. Чичерина, 34а',
                'short' => 'Чичерина',
            ],
            'ТACdAAR' => [
                'name' => 'Отделение косметологии',
                'address' => 'ул. Чичерина, 34а',
                'short' => 'Чичерина',
            ],
            'ТACdAA\\' => [
                'name' => 'Поликлиника',
                'address' => 'п. Лесной остров, ул. Градостроителей, 1/3',
                'short' => 'Лесной остров',
            ],
            'ТAGdAAE' => [ // ID из логов для ЭКО
                'name' => 'ЭкоКлиника',
                'address' => 'ул. Чичерина, 36В',
                'short' => 'ЭКО',
            ],
            // На случай, если используется ID организации
            'ТAGdAADANAA' => [
                'name' => 'ЭкоКлиника',
                'address' => 'ул. Чичерина, 36В',
                'short' => 'ЭКО',
            ],
        ]
    ],

    // [SECURITY] Centralized Security Configuration
    'security' => [
        'sanitization' => [
            'sensitive_keys' => [
                'apikey', 'token', 'auth', 'password', 'secret', 'key', 
                'phone', 'email', 'credit_card', 'cvv', 'access_token'
            ],
            'mask_visible_start' => 4,
            'mask_visible_end' => 4,
            'mask_threshold' => 10 
        ]
    ],

    // [DEBUG POLICY] SSOT for Debugging
    'debug' => [
        // MASTER SWITCH: If false, ?debug=1 will be ignored globally.
        // Set to false in production for security.
        'allowed' => true, 
        
        // Allowed IPs (Optional, leave empty to allow all if 'allowed' is true)
        'allowed_ips' => [] 
    ],

    'rate_limit' => [
        'enabled' => true,
        'max_requests' => 60,
        'window_seconds' => 60,
        'storage_path' => __DIR__ . '/../cache/limits'
    ],

    'logging' => [
        'enabled' => true,
        'level' => 'info', 
    ],

    'recaptcha' => $secrets['recaptcha'] ?? [],
    'admin_secret' => $secrets['admin_secret'] ?? null,
];
