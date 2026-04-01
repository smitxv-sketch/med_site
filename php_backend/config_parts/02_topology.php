<?php
// PART 2: BUSINESS TOPOLOGY
// Клиника "Источник" (Челябинск)

return [
    'topology' => [
        // Города
        'cities' => [
            'enabled' => true,
            'items' => [
                'chel' => ['label' => 'Челябинск', 'default' => true],
                // 'spb' => ['label' => 'Санкт-Петербург', 'default' => false] // Скрыт пока
            ]
        ],

        // Измерения (Фильтры)
        'dimensions' => [
            // 1. Фильтр "Детям / Взрослым"
            // ОТКЛЮЧЕНО (enabled = false): 
            // Это убирает шаг "Уточните параметры" (Шаг 1 из 4).
            // Воронка станет 3-шаговой: Врачи -> Слоты -> Форма.
            'patient_type' => [ 
                'enabled' => false, 
                'key' => 'audience',
                'label' => 'Пациент',
                'mode' => 'tabs', 
                'options' => [
                    [
                        'id' => 'adult', 
                        'label' => 'Взрослые', 
                        'icon' => 'User',
                        'isDefault' => true,
                        'rules' => [
                            'filtering' => ['require_tags' => ['audience' => 'adult']]
                        ]
                    ],
                    [
                        'id' => 'child', 
                        'label' => 'Дети', 
                        'icon' => 'Baby',
                        'rules' => [
                            'filtering' => ['require_tags' => ['audience' => 'child']]
                        ]
                    ]
                ]
            ],
            
            // 2. Фильтр по филиалам (mode='filter' не создает отдельный шаг, это просто выпадающий список)
            'branch' => [
                'enabled' => true,
                'key' => 'branch', 
                'label' => 'Филиал',
                'mode' => 'filter', 
                'options' => [] // Заполняется динамически из API
            ]
        ],

        // Логика работы с филиалами
        'branches' => [
            'enabled' => true,
            'logic' => 'dynamic_aggregation', // Сначала врач, потом филиал
            'cross_branch_suggestion' => true // Показывать "Этот врач принимает также на Труда"
        ]
    ]
];
