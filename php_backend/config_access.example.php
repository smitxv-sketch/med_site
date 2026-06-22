<?php
// Copy to config_access.php (gitignored) and fill in real values.

return [
    'admin_secret' => '',
    'tools_password' => '',

    'cms_db' => [
        'host' => 'localhost',
        'dbname' => '',
        'user' => '',
        'password' => '',
        'prefix' => 'wp_',
        'charset' => 'utf8mb4',
    ],

    'qms_instances' => [
        'chel_main' => [
            'name' => 'Челябинск (Основная)',
            'api_url' => '',
            'api_token' => '',
            'city_code' => 'chel',
            'is_primary' => true,
        ],
    ],

    'recaptcha' => [
        'secret_key' => '',
        'site_key' => '',
    ],

    'sentry_dsn' => '',
];
