<?php
// PART 6: DYNAMIC VISUAL LOGIC
// Правила оформления, зависящие от контента (RegEx -> Icon/Color).
// Не путать со статической темой в 04_theme.php.

return [
    'visual_rules' => [
        'default' => ['icon' => 'Stethoscope', 'color' => 'blue'],
        
        // Паттерны поиска по названию услуги/врача
        // Ключ: часть слова (RegEx-like), Значение: настройки UI
        'patterns' => [
            // --- ДИАГНОСТИКА ---
            'узи' => ['icon' => 'Activity', 'color' => 'indigo'],
            'экг' => ['icon' => 'Activity', 'color' => 'red'],
            'рентген' => ['icon' => 'Bone', 'color' => 'slate'],
            'эндоскоп' => ['icon' => 'Eye', 'color' => 'cyan'],
            'томограф' => ['icon' => 'Brain', 'color' => 'slate'],
            
            // --- ПРОГРАММЫ ---
            'check-up' => ['icon' => 'Sparkles', 'color' => 'green'],
            'вакцин' => ['icon' => 'Heart', 'color' => 'teal'],
            'массаж' => ['icon' => 'User', 'color' => 'orange'],

            // --- ВРАЧИ ---
            'педиатр' => ['icon' => 'Baby', 'color' => 'orange'],
            'детск' => ['icon' => 'Baby', 'color' => 'orange'],
            'кардио' => ['icon' => 'Heart', 'color' => 'red'],
            'сердц' => ['icon' => 'Heart', 'color' => 'red'],
            'невро' => ['icon' => 'Brain', 'color' => 'purple'],
            'псих' => ['icon' => 'Brain', 'color' => 'purple'],
            'дерма' => ['icon' => 'Sparkles', 'color' => 'pink'],
            'космет' => ['icon' => 'Sparkles', 'color' => 'pink'],
            'стомат' => ['icon' => 'Smile', 'color' => 'teal'],
        ]
    ]
];
