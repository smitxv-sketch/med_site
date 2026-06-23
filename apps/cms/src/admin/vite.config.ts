import path from 'path';
import { mergeConfig, type UserConfig } from 'vite';

// В monorepo npm hoisting кладёт пакеты в корневой node_modules (не в apps/cms/node_modules).
// Корневой react-router-dom@7 конфликтует со Strapi (нужен v6) → пустая admin и
// "Duplicate middleware references found when creating the store".
const repoRoot = path.resolve(__dirname, '../../../..');
const rootPkg = (name: string) => path.join(repoRoot, 'node_modules', name);

export default (config: UserConfig) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        react: rootPkg('react'),
        'react-dom': rootPkg('react-dom'),
        'react-router': rootPkg('react-router'),
        'react-router-dom': rootPkg('react-router-dom'),
        'styled-components': rootPkg('styled-components'),
      },
    },
  });
};
