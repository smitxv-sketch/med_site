const fs = require('fs');
const path = require('path');

const srcRegistryPath = path.resolve(__dirname, '../src/shared/config/widgetsRegistry.ts');

const registryFileContent = fs.readFileSync(srcRegistryPath, 'utf8');

// A quick hack using regex to extract each definition
const widgets = [
  'HeroWidget', 'CategoriesWidget', 'PromotionsWidget', 'SpecialOffersWidget',
  'DirectionsWidget', 'DoctorsWidget', 'LocationsWidget', 'GalleryWidget',
  'FeaturesWidget', 'TimelineWidget', 'FaqWidget', 'ReviewsWidget',
  'CalculatorWidget', 'PortfolioWidget', 'showcase', 'program', 'header', 'footer', 'GridContainerWidget'
];

let remainingContent = registryFileContent;
const definitions = {};

for (const w of widgets) {
  // Try to find the block for widget w
  const regex = new RegExp(`['"]?${w}['"]?:\\s*(\\{[\\s\\S]*?\\n  \\})(,|\\n\\};)`, 'm');
  const match = remainingContent.match(regex);
  if (match) {
    definitions[w] = match[1];
  } else {
    console.warn(`Could not find definition for ${w}`);
  }
}

// Write to files
const widgetsDir = path.resolve(__dirname, '../src/widgets');
const mapWidgetToDir = {
  HeroWidget: 'hero-widget', CategoriesWidget: 'categories-widget', PromotionsWidget: 'promotions-widget',
  SpecialOffersWidget: 'special-offers-widget', DirectionsWidget: 'directions-widget', DoctorsWidget: 'doctors-widget',
  LocationsWidget: 'locations-widget', GalleryWidget: 'gallery-widget', FeaturesWidget: 'features-widget',
  TimelineWidget: 'timeline-widget', FaqWidget: 'faq-widget', ReviewsWidget: 'reviews-widget',
  CalculatorWidget: 'calculator-widget', PortfolioWidget: 'portfolio-widget', showcase: 'showcase-widget',
  program: 'program-widget', header: 'header-widget', footer: 'footer-widget', GridContainerWidget: 'container-widget'
};

const exportedKeys = [];

for (const [w, definition] of Object.entries(definitions)) {
  const dirName = mapWidgetToDir[w];
  if (!dirName) {
    console.warn("No dir mapping for", w);
    continue;
  }
  const dirPath = path.resolve(widgetsDir, dirName);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Quick fix for showcase and program which are legacy schema instead of props
  let def = definition;
  
  if (w === 'showcase' || w === 'program' || w === 'header' || w === 'footer') {
	  if (!def.includes("type: '")) {
		def = `{\n  type: '${w}',\n` + def.substring(1);
	  }
  }

  const schemaContent = `import { WidgetDefinition } from '@/shared/types/widget';\n\nexport const ${w}Schema: WidgetDefinition = ${def};\n`;
  
  fs.writeFileSync(path.join(dirPath, 'schema.ts'), schemaContent);
  exportedKeys.push(w);
}

// Generate new widgetsRegistry.ts
const newRegistryLines = [
  `import { WidgetDefinition } from '@/shared/types/widget';`
];

for (const w of exportedKeys) {
  newRegistryLines.push(`import { ${w}Schema } from '@/widgets/${mapWidgetToDir[w]}/schema';`);
}

newRegistryLines.push('');
newRegistryLines.push(`export const WIDGETS_REGISTRY: Record<string, WidgetDefinition> = {`);
for (const w of exportedKeys) {
  newRegistryLines.push(`  '${w}': ${w}Schema,`);
}
newRegistryLines.push(`};`);

fs.writeFileSync(srcRegistryPath, newRegistryLines.join('\n'));
console.log("Successfully extracted schemas.");
