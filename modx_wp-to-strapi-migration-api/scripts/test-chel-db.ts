/**
 * Проверка MySQL Челябинска (Beget) — для локального запуска и тикета в ТП.
 */
import { loadAppEnv } from '../../infra/loadAppEnv.mjs';
import { runChelMysqlDiagnostics } from '../server/lib/chelMysqlDiagnostics.js';

loadAppEnv('legacy-bridge-istochnik');

const report = await runChelMysqlDiagnostics();

console.log('=== CHEL MySQL Diagnostics ===');
console.log(JSON.stringify(report, null, 2));

if (report.mysql.ok) {
  console.log('\nSUCCESS: MySQL подключение работает');
  process.exit(0);
}

console.log('\nFAILED: MySQL не пускает');
if (report.publicIp) {
  console.log(`Исходящий IP: ${report.publicIp}`);
  console.log(`Beget видит клиента как: ${report.mysql.serverSeenClientAs ?? '?'}`);
}
console.log(`Код: ${report.mysql.code}`);
console.log(`Сообщение: ${report.mysql.message}`);
process.exit(1);
