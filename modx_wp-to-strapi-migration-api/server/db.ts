import { LegacyMysqlGateway } from './legacy/LegacyMysqlGateway.js';

const gw = LegacyMysqlGateway.get('spb');

/** Throttled gateway для MODX (СПб) */
export const pool = gw;

export const getPrefix = () => gw.getPrefix();

export { getExcludedIds } from './bridgeDb.js';
