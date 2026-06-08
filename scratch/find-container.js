const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
        searchDir(fullPath);
      }
    } else {
      const ext = path.extname(file);
      if (ext === '.tsx' || ext === '.ts' || ext === '.css') {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('max-w-') || content.includes('mx-auto') || content.includes('container')) {
          const lines = content.split('\n');
          lines.forEach((line, idx) => {
            if (line.includes('max-w-') || line.includes('mx-auto') || line.includes('container')) {
              // Only print lines that could affect layout width
              if (line.includes('hero') || line.includes('main') || line.includes('section') || line.includes('layout') || line.includes('body')) {
                console.log(`${fullPath}:${idx + 1}: ${line.trim()}`);
              }
            }
          });
        }
      }
    }
  }
}

searchDir(path.join(__dirname, '..', 'src'));
