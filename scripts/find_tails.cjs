const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(SRC_DIR);

const report = {
  directApiCalls: [],
  directMockImports: [],
  potentialHardcodedData: [],
  missingAnalytics: []
};

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const relativePath = path.relative(SRC_DIR, file);

  // Skip infrastructure/api files where these ARE allowed
  if (relativePath.includes('shared/infrastructure') || 
      relativePath.includes('shared/api') || 
      relativePath.includes('widget/services') ||
      relativePath.includes('model/mock-data.ts') ||
      relativePath.includes('api/mocks/')) {
    return;
  }

  // 1. Direct API Calls Bypass DI
  if (content.match(/import\s+{.*(fetch|get|getAll|book)[a-zA-Z0-9_]*.*}\s+from\s+.*api/)) {
    report.directApiCalls.push(relativePath);
  }

  // 2. Direct Mock Data Bypass DI
  if (content.match(/import\s+{.*mock.*}\s+from\s+.*mock-data/)) {
    report.directMockImports.push(relativePath);
  }

  // 3. Potential hardcoded data arrays in UI sections
  if (relativePath.includes('/ui/') && (relativePath.includes('Section') || relativePath.includes('Page'))) {
    // Check for top-level const arrays of objects
    if (content.match(/const\s+[a-zA-Z0-9_]+\s*=\s*\[\s*\{[\s\S]{10,200}id:/)) {
      report.potentialHardcodedData.push(relativePath);
    }
  }

  // 4. Missing Analytics on click handlers
  if (relativePath.includes('/ui/')) {
    const buttons = content.match(/<(Button|button|div|a|Link)[^>]*onClick=[^>]*>/g);
    if (buttons) {
      buttons.forEach(btn => {
        if (!btn.includes('analytics.trackEvent')) {
          // It might be calling a function that calls trackEvent, but it's worth flagging
          // Let's only flag if it's literally an inline function that doesn't have trackEvent
          if (btn.match(/onClick=\{[(]?[a-zA-Z0-9_, ]*[)]?\s*=>\s*\{?[^}]*(?!analytics\.track)/)) {
             if (!report.missingAnalytics.includes(relativePath)) {
                report.missingAnalytics.push(relativePath);
             }
          }
        }
      });
    }
  }
});

fs.writeFileSync(path.resolve(__dirname, '../plan/TAILS_REPORT.json'), JSON.stringify(report, null, 2));

console.log('Tails check completed. Report generated at /plan/TAILS_REPORT.json');
