<?php
/**
 * Скрипт для кэширования данных врачей в плоскую таблицу.
 * Запускать по крону: php /путь/к/сайту/update_doctors_cache.php
 */

// Подключаем ядро WordPress.
// ВАЖНО: этот файл обычно лежит в корне сайта (рядом с wp-config.php),
// а данный скрипт находится в /oz/. Поэтому ищем wp-load.php выше по дереву.
//
// Если вы запускаете через браузер и видите 500 — чаще всего это потому,
// что wp-load.php не найден и PHP падает с фатальной ошибкой.
header('Content-Type: text/plain; charset=utf-8');

$wpLoad = null;
$dir = __DIR__;
for ($i = 0; $i <= 6; $i++) {
    $candidate = $dir . DIRECTORY_SEPARATOR . 'wp-load.php';
    if (file_exists($candidate)) {
        $wpLoad = $candidate;
        break;
    }
    $parent = dirname($dir);
    if ($parent === $dir) break;
    $dir = $parent;
}

if (!$wpLoad) {
    http_response_code(500);
    echo "Ошибка: не найден wp-load.php.\n";
    echo "Проверьте, что скрипт лежит внутри WordPress-сайта и доступен путь до корня.\n";
    echo "Текущая папка: " . __DIR__ . "\n";
    exit;
}

require_once $wpLoad;

global $wpdb;
$table_name = $wpdb->prefix . 'doctors_api_cache';

echo "Начинаем сборку кэша врачей...\n";

// 1. Получаем всех пользователей, у которых есть id_doctor_qms
$query = "
    SELECT u.ID, u.display_name, m_qms.meta_value as qms_id
    FROM {$wpdb->users} u
    JOIN {$wpdb->usermeta} m_qms ON u.ID = m_qms.user_id AND m_qms.meta_key = 'id_doctor_qms'
    WHERE m_qms.meta_value IS NOT NULL AND m_qms.meta_value != ''
";
$doctors = $wpdb->get_results($query);

if (empty($doctors)) {
    die("Врачи не найдены.\n");
}

echo "Найдено врачей: " . count($doctors) . "\n";

$photo_keys = ['photo', 'photo_list', 'avatar', 'profile_picture', 'cupp_upload_meta', 'wp_user_avatar', 'user_avatar', 'image', 'picture', 'thumbnail'];

foreach ($doctors as $doc) {
    $user_id = $doc->ID;
    $meta = get_user_meta($user_id);
    
    // Хелпер для получения одиночного значения из меты (WP возвращает массивы)
    $get_meta = function($key) use ($meta) {
        if (!isset($meta[$key]) || !isset($meta[$key][0])) return '';
        $val = $meta[$key][0];
        $unserialized = @unserialize($val);
        return ($unserialized !== false || $val === 'b:0;') ? $unserialized : $val;
    };

    // --- Логика трансформации (1 в 1 как в Node.js) ---

    // Специальность
    $specialty = $get_meta('feed_spec');
    if (empty($specialty) || is_array($specialty)) {
        $pos = $get_meta('position') ?: $get_meta('anonce') ?: '';
        $parts = preg_split('/[.,]/', $pos);
        $specialty = !empty($parts) ? trim($parts[0]) : 'Врач';
    }

    // Должность
    $position = $get_meta('position') ?: $get_meta('anonce') ?: '';

    // Стаж
    $experience_years = 0;
    $start_date = $get_meta('feed_start_date');
    $current_year = (int)date('Y');
    if ($start_date && strlen($start_date) == 8) {
        $start_year = (int)substr($start_date, 0, 4);
        if ($start_year > 0) {
            $experience_years = $current_year - $start_year;
        }
    } else {
        $stage = $get_meta('stage');
        if (preg_match('/(\d{4})/', $stage, $matches)) {
            $experience_years = $current_year - (int)$matches[1];
        }
    }

    // Цена
    $price = (int)$get_meta('feed_price');
    if (!$price) {
        $cost = $get_meta('cost');
        if ($cost) {
            $price = (int)preg_replace('/\D/', '', $cost);
        }
    }
    $price = $price > 0 ? $price : null;

    // Длительность приема
    $duration = (int)$get_meta('duration');
    $duration = $duration > 0 ? $duration : null;

    // Степень
    $degree = $get_meta('feed_stepen');
    if (!$degree) {
        $text_to_search = mb_strtolower($position . ' ' . $get_meta('anonce'));
        if (strpos($text_to_search, 'доктор медицинских наук') !== false) {
            $degree = 'Доктор медицинских наук';
        } elseif (strpos($text_to_search, 'кандидат медицинских наук') !== false) {
            $degree = 'Кандидат медицинских наук';
        }
    }

    // Звание
    $zvanie = $get_meta('feed_zvanie');
    if (!$zvanie) {
        $text_to_search = mb_strtolower($position . ' ' . $get_meta('anonce'));
        if (strpos($text_to_search, 'профессор') !== false) {
            $zvanie = 'Профессор';
        } elseif (strpos($text_to_search, 'доцент') !== false) {
            $zvanie = 'Доцент';
        }
    }

    // Категория
    $category = $get_meta('feed_category');
    if (!$category) {
        $text_to_search = mb_strtolower($position . ' ' . $get_meta('anonce'));
        if (strpos($text_to_search, 'высшей категории') !== false || strpos($text_to_search, 'высшая категория') !== false) {
            $category = 'Высшая категория';
        } elseif (strpos($text_to_search, 'первой категории') !== false || strpos($text_to_search, 'первая категория') !== false) {
            $category = 'Первая категория';
        }
    }

    // Детский/Взрослый
    $is_child_doctor = $get_meta('feed_childdoctor') === '1' ? 1 : 0;
    $is_adult_doctor = $get_meta('feed_adultdoctor') === '1' ? 1 : 0;

    // Фото
    $photo_url = null;
    foreach ($photo_keys as $key) {
        $val = $get_meta($key);
        if ($val) {
            if (is_string($val) && strpos($val, 'http') === 0) {
                $photo_url = $val;
                break;
            } elseif (is_numeric($val)) {
                $url = wp_get_attachment_url($val);
                if ($url) {
                    $photo_url = $url;
                    break;
                }
            }
        }
    }

    // Образование (История)
    $education_history = [];
    $edu_indices = [];
    foreach ($meta as $key => $val) {
        if (preg_match('/^feed_edu_(\d+)_/', $key, $matches)) {
            $edu_indices[$matches[1]] = true;
        }
    }
    $edu_indices = array_keys($edu_indices);
    sort($edu_indices, SORT_NUMERIC);
    
    foreach ($edu_indices as $idx) {
        $year_raw = $get_meta("feed_edu_{$idx}_feed_edu_dete");
        $org = $get_meta("feed_edu_{$idx}_feed_edu_org");
        $spec = $get_meta("feed_edu_{$idx}_feed_edu_spec");
        $type = $get_meta("feed_edu_{$idx}_feed_edu_name");
        
        if ($year_raw && $org) {
            $education_history[] = [
                'year' => substr($year_raw, 0, 4),
                'organization' => $org,
                'specialty' => $spec,
                'type' => $type
            ];
        }
    }

    // Текст образования
    $education_text = $get_meta('education');
    $extra_edu = $get_meta('extraeducation');
    $conferences = $get_meta('conferences');
    $certificates = $get_meta('feer_serts') ?: $get_meta('feed_serts') ?: $get_meta('certificates') ?: $get_meta('certs');
    
    if ($extra_edu) {
        $education_text = $education_text ? "{$education_text}<br/><br/><strong>Дополнительное образование:</strong><br/>{$extra_edu}" : $extra_edu;
    }
    if ($conferences) {
        $education_text = $education_text ? "{$education_text}<br/><br/><strong>Конференции:</strong><br/>{$conferences}" : $conferences;
    }
    if ($certificates) {
        $education_text = $education_text ? "{$education_text}<br/><br/><strong>Сертификаты:</strong><br/>{$certificates}" : $certificates;
    }

    // Бейджи
    $badges = [];
    $badges_raw = $get_meta('badges');
    if ($badges_raw) {
        $decoded = json_decode($badges_raw, true);
        if (is_array($decoded)) {
            $badges = $decoded;
        }
    }
    if ($degree) $badges[] = ['type' => 'degree', 'label' => $degree, 'code' => 'degree'];
    if ($zvanie) $badges[] = ['type' => 'zvanie', 'label' => $zvanie, 'code' => 'zvanie'];
    if ($category) $badges[] = ['type' => 'category', 'label' => $category, 'code' => 'category'];

    // Собираем сырую мету (берем только первые значения массивов для компактности)
    $raw_meta = [];
    foreach ($meta as $k => $v) {
        $raw_meta[$k] = maybe_unserialize($v[0]);
    }

    // Данные для вставки
    $data = [
        'wp_user_id' => $user_id,
        'qms_id' => $doc->qms_id,
        'display_name' => $doc->display_name,
        'specialty' => $specialty ?: null,
        'photo_url' => $photo_url ?: null,
        'experience_years' => $experience_years,
        'price' => $price,
        'duration' => $duration,
        'category' => $category ?: null,
        'degree' => $degree ?: null,
        'zvanie' => $zvanie ?: null,
        'position' => $position ?: null,
        'is_child_doctor' => $is_child_doctor,
        'is_adult_doctor' => $is_adult_doctor,
        'education_history' => !empty($education_history) ? wp_json_encode($education_history, JSON_UNESCAPED_UNICODE) : null,
        'education_text' => $education_text ?: null,
        'description' => $get_meta('description') ?: null,
        'anonce' => $get_meta('anonce') ?: null,
        'activities' => $get_meta('activities') ?: null,
        'badges' => !empty($badges) ? wp_json_encode($badges, JSON_UNESCAPED_UNICODE) : null,
        'raw_meta' => !empty($raw_meta) ? wp_json_encode($raw_meta, JSON_UNESCAPED_UNICODE) : null
    ];

    // Форматы полей для безопасной вставки (WP сам обработает null)
    $format = [
        '%d', // wp_user_id
        '%s', // qms_id
        '%s', // display_name
        '%s', // specialty
        '%s', // photo_url
        '%d', // experience_years
        '%d', // price
        '%d', // duration
        '%s', // category
        '%s', // degree
        '%s', // zvanie
        '%s', // position
        '%d', // is_child_doctor
        '%d', // is_adult_doctor
        '%s', // education_history
        '%s', // education_text
        '%s', // description
        '%s', // anonce
        '%s', // activities
        '%s', // badges
        '%s'  // raw_meta
    ];

    // Проверяем, существует ли уже запись
    $exists = $wpdb->get_var($wpdb->prepare("SELECT id FROM {$table_name} WHERE wp_user_id = %d", $user_id));
    
    if ($exists) {
        $result = $wpdb->update($table_name, $data, ['wp_user_id' => $user_id], $format, ['%d']);
    } else {
        $result = $wpdb->insert($table_name, $data, $format);
    }

    if ($result === false) {
        echo "Ошибка сохранения врача ID {$user_id}: " . $wpdb->last_error . "\n";
    }
}

echo "Успешно! Таблица кэша врачей обновлена.\n";