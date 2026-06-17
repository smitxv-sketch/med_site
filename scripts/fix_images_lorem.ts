import fs from 'fs';
import path from 'path';

let idx = 1;

function processDirectory(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.git')) {
                processDirectory(fullPath);
            }
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let matched = false;
            content = content.replace(/https:\/\/images\.pexels\.com\/photos\/[0-9]+\/[a-zA-Z0-9\-\.]+(?:\?[\w=&]*)?/g, (match) => {
                matched = true;
                const url = `https://loremflickr.com/800/600/clinic,hospital?lock=${idx}`;
                idx++;
                return url;
            });
            if (matched) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(path.resolve('./src'));
