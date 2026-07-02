<?php
/**
 * Санкт-Петербург через хостинг ЧЛБ (IP ci74 в whitelist QMS → туннель в back.cispb.ru).
 *
 * Залить на ci74.ru:
 *   /booking/php/proxy-spb.php
 *   /booking/php/config.spb.php   (из config.spb.example.php)
 *
 * Запись:  .../proxy-spb.php?endpoint=spec_list   + apikey записи СПб в теле
 * Прайс:   .../proxy-spb.php?endpoint=getPr       + JSON (ключ прайса, qqc244)
 *
 * Челябинский proxy.php / config.php не трогаем.
 */
$qmsProxyConfigFile = __DIR__ . '/config.spb.php';
require __DIR__ . '/qms-proxy.inc.php';
