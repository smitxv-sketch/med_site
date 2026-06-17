const fs = require('fs');
const files = [
  'src/widgets/features-widget/ui/FeaturesWidget.tsx',
  'src/widgets/timeline-widget/ui/TimelineWidget.tsx',
  'src/widgets/gallery-widget/ui/GalleryWidget.tsx',
  'src/widgets/reviews-widget/ui/ReviewsWidget.tsx',
  'src/widgets/faq-widget/ui/FaqWidget.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('variant?: string;')) {
    content = content.replace(/variantOverride\?: string;/g, 'variantOverride?: string;\n  variant?: string;');
  }
  
  const regex = /export function \w+\(\{\s*(.*?)\s*\}\s*:\s*\w+Props\)/;
  const match = content.match(regex);
  if (match) {
    const props = match[1];
    if (!props.includes('variant,')) {
       const newProps = props.replace(/variantOverride,/, 'variantOverride, variant,');
       content = content.replace(props, newProps);
    }
  }

  if (content.includes('if (variantOverride) {')) {
    content = content.replace(/if \(variantOverride\) \{\n\s+activeVariant = variantOverride;\n\s+\}/, '');
    content = content.replace(/else if \(variantOverride\) \{\n\s+activeVariant = variantOverride;\n\s+\}/, '');
    
    // insert at top of if
    if (content.includes('let activeVariant = ')) {
        content = content.replace(/let activeVariant = 'A';\n\s*if \(layoutPattern\) \{/, "let activeVariant = 'A';\n  if (variant || variantOverride) {\n    activeVariant = (variant || variantOverride) as string;\n  } else if (layoutPattern) {");
        content = content.replace(/let activeVariant = 'A';\n\s*if \(intent\) \{/, "let activeVariant = 'A';\n  if (variant || variantOverride) {\n    activeVariant = (variant || variantOverride) as string;\n  } else if (intent) {");
    }
  }

  fs.writeFileSync(file, content);
}
