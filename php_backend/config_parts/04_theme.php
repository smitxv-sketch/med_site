<?php
// PART 4: THEME & BRANDING
// Клиника "Источник"

return [
    'client' => [
        'name' => 'Клиника Источник',
        'city_default' => 'chel',
    ],

    // [NEW] Global Localization Settings
    'localization' => [
        'country_code' => 'RU', 
        'locale' => 'ru-RU',
        'currency' => 'RUB', 
        'phone' => [
            'prefix' => '+7',
            'maskChar' => '_',
            'maxLength' => 18,
            'placeholder' => '+7 (___) ___-__-__',
            // Regex simplified to avoid escape character issues in JSON transport
            'validationRegex' => '' 
        ],
        'firstDayOfWeek' => 1, 
        'dateFormat' => 'DD.MM.YYYY'
    ],

    'theme' => [
        'logo_url' => 'https://lk.ci74.ru/c/static/images/logo.png', 
        
        'colors' => [
            'primary' => '#65a30d', 
            'accent' => '#ea8025',  
            'background' => '#ffffff' 
        ],
        
        'contacts' => [
            'phone' => '+7 (351) 77-88-887',
            'website' => 'https://ci74.ru'
        ],
        
        'doctor_card' => [
            'show_experience' => true,
            'show_category'   => true, 
            'show_badges'     => true, 
            'show_rating'     => false, 
            'show_price'      => true   
        ],

        'suggestions' => [
            ['label' => 'Терапевт', 'type' => 'specialty'],
            ['label' => 'Педиатр', 'type' => 'specialty'],
            ['label' => 'УЗИ', 'type' => 'search'],
            ['label' => 'Гинеколог', 'type' => 'specialty']
        ],
        
        'labels' => [
            'step1Title' => 'Запись на прием',
            'step2Title' => 'Выберите специалиста',
            'step3Title' => 'Удобный филиал',
            
            'searchPlaceholder' => 'Врач, услуга или специальность...',
            'showAllDoctors' => 'Весь список врачей',
            
            'categoriesTitle' => 'Выберите направление',
            'categoryHint' => 'Направлений в разделе "%s": %s',
            
            'selectTimeBtn' => 'Расписание',
            'confirmBookingBtn' => 'Записаться',
            
            'priceFrom' => 'от',
            'currency' => '₽',
            'noAddress' => 'Адрес уточняется',
        ]
    ]
];
