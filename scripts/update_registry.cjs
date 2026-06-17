const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/shared/config/widgetsRegistry.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace imports
content = content.replace(
  /export type PropSchemaType = 'number' \| 'string' \| 'select' \| 'boolean';\n\nexport interface WidgetPropSchema \{[\s\S]*?\}\n\nexport interface WidgetSchema \{[\s\S]*?\}/,
  `import { WidgetDefinition } from '@/shared/types/widget';`
);

content = content.replace(/Record<WidgetType, WidgetSchema>/g, 'Record<string, WidgetDefinition>');

// Add namespaces heuristically
content = content.replace(/name:\s*'intent'(\s*,)/g, "name: 'intent', namespace: 'design'$1");
content = content.replace(/name:\s*'layoutPattern'(\s*,)/g, "name: 'layoutPattern', namespace: 'design'$1");
content = content.replace(/name:\s*'title'(\s*,)/g, "name: 'title', namespace: 'content'$1");
content = content.replace(/name:\s*'subtitle'(\s*,)/g, "name: 'subtitle', namespace: 'content'$1");
content = content.replace(/name:\s*'directionId'(\s*,)/g, "name: 'directionId', namespace: 'content'$1");
content = content.replace(/name:\s*'limit'(\s*,)/g, "name: 'limit', namespace: 'content'$1");
content = content.replace(/name:\s*'columns'(\s*,)/g, "name: 'columns', namespace: 'design'$1");
content = content.replace(/name:\s*'gap'(\s*,)/g, "name: 'gap', namespace: 'design'$1");
content = content.replace(/name:\s*'iconVariantOverride'(\s*,)/g, "name: 'iconVariantOverride', namespace: 'design'$1");

fs.writeFileSync(filePath, content);
console.log("Updated widgetsRegistry.ts");
