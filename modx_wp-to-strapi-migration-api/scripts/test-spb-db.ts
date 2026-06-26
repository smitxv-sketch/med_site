/**
 * Проверка MySQL СПб (Beget) — те же env, что в Coolify bridge-istochnik.
 */
import { loadAppEnv } from '../../infra/loadAppEnv.mjs';
import { runSpbMysqlDiagnostics } from '../server/lib/spbMysqlDiagnostics.js';

loadAppEnv('legacy-bridge-istochnik');

const report = await runSpbMysqlDiagnostics();

console.log('=== SPB MySQL Diagnostics ===');
console.log(JSON.stringify(report, null, 2));

if (report.mysql.ok) {
  console.log(`\nSUCCESS: MySQL СПб OK, врачей (template 7): ${report.mysql.doctorCount}`);
  process.exit(0);
}

console.log('\nFAILED: MySQL СПб не пускает');
if (report.publicIp) {
  console.log(`Исходящий IP: ${report.publicIp}`);
  console.log(`Beget видит клиента как: ${report.mysql.serverSeenClientAs ?? '?'}`);
}
console.log(`TCP: ${report.tcp.ok ? 'ok' : report.tcp.error}`);
console.log(`MySQL: ${report.mysql.code} — ${report.mysql.message}`);
process.exit(1);
