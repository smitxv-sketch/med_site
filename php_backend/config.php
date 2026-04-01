<?php
/**
 * MASTER CONFIGURATION LOADER
 * 
 * ВНИМАНИЕ: Не редактируйте этот файл напрямую для изменения настроек!
 * Настройки разбиты на модули в папке /config_parts/.
 * 
 * Структура:
 * - 01_infrastructure.php (Секреты, БД, API)
 * - 02_topology.php (Города, Вертикали)
 * - 03_logic.php (Правила бизнеса)
 * - 04_theme.php (Внешний вид)
 * - 99_helpers.php (Функции)
 */

$partsDir = __DIR__ . '/config_parts';
$masterConfig = [];

// 1. Проверяем наличие папки частей
if (!is_dir($partsDir)) {
    die("Critical Error: Configuration parts directory not found.");
}

// 2. Сканируем и сортируем файлы
$files = glob($partsDir . '/*.php');
sort($files); // Гарантирует порядок 01, 02, 03...

// 3. Собираем конфиг (Merge Strategy)
foreach ($files as $file) {
    $part = require $file;
    if (is_array($part)) {
        // Рекурсивное слияние массивов, чтобы последующие файлы могли дополнять предыдущие
        $masterConfig = array_replace_recursive($masterConfig, $part);
    }
}

// 4. Возвращаем единый массив
return $masterConfig;
