<?php
// config_access.php - SENSITIVE DATA
// Этот файл содержит пароли и ключи. Он должен быть исключен из git.

return [
    // 0. Безопасность Админки
    // Секретный ключ для общения между серверами (если будет SaaS)
    'admin_secret' => 'CHANGE_THIS_TO_COMPLEX_PASSWORD_123',
    
    // Пароль для входа в папку tools/ (Интеграторская панель)
    'tools_password' => 'admin', // <-- ВАШ ПАРОЛЬ ДЛЯ ВХОДА

    // 1. Доступы к базе данных сайта (WordPress/MODX)
    // Используются для чтения контента врачей (фото, био)
    'cms_db' => [
        'host' => 'localhost', 
        'dbname' => 'YOUR_DB_NAME',
        'user' => 'YOUR_DB_USER',
        'password' => 'YOUR_DB_PASSWORD',
        'prefix' => 'wp_', 
        'charset' => 'utf8mb4'
    ],

    // 2. Интеграция с МИС (qMS)
    // Используется для получения расписания и записи
    'qms_instances' => [
        'chel_main' => [
            'name' => 'Челябинск (Основная)',
            'api_url' => 'https://back.cispb.ru/robot-dev',
            'api_token' => 'some_api_key_for_backend', 
            'city_code' => 'chel',
            'is_primary' => true
        ],
        // Можно добавить другие базы здесь
    ],

    // 3. Защита и Аналитика
    'recaptcha' => [
        'secret_key' => '',
        'site_key' => ''
    ],
    
    'sentry_dsn' => ''
];
