const fs = require('fs');
const path = require('path');

const appDataDir = 'C:/Users/Avadhesh Singh/.gemini/antigravity-ide';

function search(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        search(fullPath);
      } else {
        if (file.toLowerCase().includes('temple') || file.toLowerCase().includes('sanctum') || file.toLowerCase().includes('hero')) {
          if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp')) {
            console.log(`${fullPath} (${stat.size} bytes)`);
          }
        }
      }
    }
  } catch (e) {
    // Ignore permission errors on some system/sub directories
  }
}

search(appDataDir);
console.log('Search complete.');
