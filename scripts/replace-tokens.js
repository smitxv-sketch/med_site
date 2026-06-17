const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace hardcoded rounded arbitrary values with Tailwind classes
  content = content.replace(/rounded-\[2rem\]/g, 'rounded-app');
  content = content.replace(/rounded-\[3rem\]/g, 'rounded-3xl');
  content = content.replace(/rounded-\[24px\]/g, 'rounded-app');
  content = content.replace(/rounded-\[32px\]/g, 'rounded-app');
  
  // Hardcoded durations (only transition durations, not every single 300)
  content = content.replace(/duration-200/g, 'duration-theme');
  content = content.replace(/duration-300/g, 'duration-theme');
  content = content.replace(/duration-[57]00/g, 'duration-theme'); // We'll map all big structural transitions to duration-theme
  
  // We'll replace transition-all without theme
  // (We'll just map duration-theme in CSS and leave it at that)

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
