<?php
// PART 99: HELPER FUNCTIONS
// Вспомогательные функции, доступные в конфиге.

return [
    'helpers' => [
        'get_db_conn' => function($config) {
            // Поддержка и старого ('cms_db') и нового ('cms' => ['db' => ...]) формата
            $c = $config['cms']['db'] ?? $config['cms_db'] ?? null;
            
            // Basic validation
            if (empty($c) || empty($c['host']) || empty($c['dbname'])) {
                throw new Exception("Конфигурация БД неполная. Проверьте 01_infrastructure.php и config_access.php.");
            }

            // Check for default placeholders
            if ($c['user'] === 'YOUR_DB_USER' || $c['dbname'] === 'YOUR_DB_NAME') {
                $userSeen = htmlspecialchars($c['user']);
                $dbSeen = htmlspecialchars($c['dbname']);
                
                // Генерируем ошибку с детальной отладкой
                $msg = "
                    <div style='background:#fee2e2; padding:20px; border:1px solid #ef4444; color:#991b1b; border-radius:8px; font-family:sans-serif;'>
                        <h3 style='margin-top:0'>⚠️ Ошибка Конфигурации (Config Mismatch)</h3>
                        <p>Сервер видит дефолтные значения вместо ваших реальных данных. Это значит, что файл <code>config_access.php</code> не читается или не обновлен.</p>
                        <div style='background:white; padding:10px; border-radius:4px; font-family:monospace; font-size:12px; margin-top:10px;'>
                            <b>Debug Info:</b><br>
                            DB User Seen: '{$userSeen}'<br>
                            DB Name Seen: '{$dbSeen}'<br>
                        </div>
                        <p style='margin-bottom:0'>Попробуйте запустить <a href='debug_config.php' style='text-decoration:underline; font-weight:bold;'>debug_config.php</a> для диагностики.</p>
                    </div>
                ";
                throw new Exception($msg);
            }
            
            try {
                $dsn = "mysql:host={$c['host']};dbname={$c['dbname']};charset={$c['charset']}";
                $opt = [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ];
                return new PDO($dsn, $c['user'], $c['password'], $opt);
            } catch (PDOException $e) {
                throw new Exception("DB Connection Failed: " . $e->getMessage());
            }
        }
    ]
];
