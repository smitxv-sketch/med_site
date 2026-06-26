import { loadConfig } from '../../configService.js';

export const getBranchesMap = (): Record<string, any> => {
  return loadConfig('branches');
};

export const extractBranchCode = (docId: string): string => {
  if (!docId) return '';
  const branches = getBranchesMap();
  
  // Sort branch codes by length descending to match the longest prefix first
  const sortedCodes = Object.keys(branches).sort((a, b) => b.length - a.length);
  
  for (const code of sortedCodes) {
    if (docId.startsWith(code)) {
      return code;
    }
  }
  return '';
};
