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
  crossModuleFSDViolations: [],
  componentsWithInlineDataFetching: [],
  missingErrorBoundaries: [],
  untrackedInteractions: [],
  tightCouplingInHooks: []
};

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const relativePath = path.relative(SRC_DIR, file).replace(/\\/g, '/');

  // 1. Cross-module FSD violations (e.g. page importing from another page)
  if (relativePath.startsWith('pages/')) {
    const currentPage = relativePath.split('/')[1];
    const pageImports = content.match(/from\s+['"]([^'"]+)['"]/g) || [];
    pageImports.forEach(imp => {
      if (imp.includes('../') && imp.includes('pages/')) {
        // trying to see if it imports from a DIFFERENT page
        const matchInfo = imp.match(/pages\/([^/'"]+)/);
        if (matchInfo && matchInfo[1] !== currentPage && matchInfo[1] !== 'app-prototype') {
          // It's a violation unless it's just types, but FSD forbids circular/cross page imports
          if (!report.crossModuleFSDViolations.includes(relativePath)) {
            report.crossModuleFSDViolations.push({ file: relativePath, invalidImport: imp });
          }
        }
      }
    });
  }

  // 2. Components with inline data fetching (useEffect with fetch/axios instead of React Query/DI)
  if (relativePath.includes('/ui/') && !relativePath.includes('shared/')) {
    if (content.includes('useEffect(() => {') && (content.includes('fetch(') || content.includes('axios.')) && !content.includes('useQuery')) {
       report.componentsWithInlineDataFetching.push(relativePath);
    }
    // Also check if they are manually trying to resolve promises from repos in useEffect instead of useQuery
    if (content.match(/useEffect[\s\S]*\.then\(/) && !content.includes('useQuery') && !relativePath.includes('AppHeader') && !relativePath.includes('SpecialOffersSection')) {
       report.componentsWithInlineDataFetching.push(relativePath);
    }
  }

  // 3. Un-tracked interactions (buttons with onClick but no analytics)
  if (relativePath.includes('/ui/') && !relativePath.includes('components/ui/')) {
    const buttons = content.match(/<Button[^>]*onClick=[^>]*>/g);
    if (buttons) {
      buttons.forEach(btn => {
        if (!btn.includes('analytics.trackEvent')) {
          if (btn.match(/onClick=\{[(]?[a-zA-Z0-9_, ]*[)]?\s*=>\s*\{?[^}]*(?!analytics\.track)/)) {
             if (!report.untrackedInteractions.includes(relativePath)) {
                report.untrackedInteractions.push(relativePath);
             }
          }
        }
      });
    }
  }

  // 4. Tight coupling in hooks - direct imports from services instead of getting from DI/params
  if (relativePath.includes('/hooks/') || relativePath.includes('/context/')) {
     if (content.match(/import\s+{.*(fetch|get|getAll|book)[a-zA-Z0-9_]*.*}\s+from\s+.*api/)) {
        report.tightCouplingInHooks.push(relativePath);
     }
  }
});

// Check Error Boundaries at the page level
const pageFiles = allFiles.filter(f => f.includes('/pages/') && f.endsWith('Page.tsx'));
pageFiles.forEach(file => {
   const content = fs.readFileSync(file, 'utf-8');
   const relativePath = path.relative(SRC_DIR, file).replace(/\\/g, '/');
   if (!content.includes('ErrorBoundary')) {
      report.missingErrorBoundaries.push(relativePath);
   }
});

fs.writeFileSync(path.resolve(__dirname, '../plan/PROD_AUDIT_REPORT.json'), JSON.stringify(report, null, 2));

console.log('Production Audit completed. Report generated at /plan/PROD_AUDIT_REPORT.json');
