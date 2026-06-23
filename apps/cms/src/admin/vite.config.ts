import path from 'path';
import { mergeConfig, type UserConfig } from 'vite';

// В monorepo корневой react-router-dom@7 конфликтует со Strapi (нужен v6) → пустая admin и
// "Duplicate middleware references found when creating the store".
const cmsRoot = path.resolve(__dirname, '../..');
const cmsPkg = (name: string) => path.join(cmsRoot, 'node_modules', name);

export default (config: UserConfig) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        react: cmsPkg('react'),
        'react-dom': cmsPkg('react-dom'),
        'react-router': cmsPkg('react-router'),
        'react-router-dom': cmsPkg('react-router-dom'),
        'styled-components': cmsPkg('styled-components'),
      },
    },
  });
};
