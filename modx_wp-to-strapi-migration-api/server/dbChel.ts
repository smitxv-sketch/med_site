import { LegacyMysqlGateway } from './legacy/LegacyMysqlGateway.js';

const gw = LegacyMysqlGateway.get('chel');

/** Throttled gateway для WordPress (Челябинск) */
export const dbChel = gw;

export const chelDbPrefix = gw.getPrefix();
