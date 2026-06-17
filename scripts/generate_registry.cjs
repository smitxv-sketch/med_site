const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(fullPath));
        } else { 
            results.push(fullPath);
        }
    });
    return results;
}

try {
    if (!fs.existsSync('plan')) {
        fs.mkdirSync('plan');
    }
    const files = walk('src');
    fs.writeFileSync('plan/project_registry.txt', files.join('\n'));
    console.log('Registry created with ' + files.length + ' files.');
} catch (e) {
    console.error(e);
}
