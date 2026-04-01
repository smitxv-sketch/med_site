<?php
// PART 5: DATA MAPPING & INTEGRATION
// Технические правила связывания данных между МИС и CMS (WordPress).

return [
    // Настройки Гидратора (Компонент, объединяющий данные)
    'hydrator' => [
        'doctor' => [
            'identity' => 'qms_api',      // Откуда берем ID и ФИО
            'schedule' => 'qms_api',      // Откуда берем расписание
            'content'  => 'wp_usermeta',  // Откуда берем фото и био
            'pricing'  => 'qms_api',      // Откуда берем цены
        ]
    ],

    // Маппинг полей базы данных CMS (WordPress)
    // Ключи массива — внутренние имена системы (DoctorFormatter), значения — meta_key в таблице wp_usermeta
    'cms_map' => [
        'meta_keys' => [
            'qms_id'        => 'id_doctor_qms', // Ключевое поле для связи
            'photo'         => 'photo',
            'bio_short'     => 'anonce',
            'bio_full'      => 'activities',
            'position'      => 'position',
            'experience'    => 'stage',         // "с 1997 года"
            'degree'        => 'feed_stepen',   // Ученая степень
            'category'      => 'feed_category', // "Высшая"
            'spec_name'     => 'position',      // Альтернативное название
            
            // [NEW] Mappings based on real data
            'education'     => 'education',     // Базовое образование (HTML)
            'extra_edu'     => 'extraeducation',// Повышение квалификации (HTML)
            'conferences'   => 'conferences'    // Награды и участие (HTML)
        ],
        'taxonomies' => [
            'services' => 'directions'          // Таксономия услуг/направлений
        ]
    ],

    // Классификация тегов (Авто-тегирование врачей на основе таксономий WP)
    'classification' => [
        'audience' => [
            'source' => 'directions', // Берем из таксономии directions
            'map'    => [
                'detskaya-poliklinika'  => 'child',
                'vzroslaya-poliklinika' => 'adult'
            ]
        ]
    ]
];
