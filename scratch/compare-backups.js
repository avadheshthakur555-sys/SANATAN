const fs = require('fs');
const path = require('path');

const file1 = path.join(__dirname, '..', 'public', 'images', 'hero-temple-sanctum.png');
const file2 = 'C:/Users/Avadhesh Singh/.gemini/antigravity-ide/brain/1c5664fd-da18-4cf6-9bf9-6b979215a43c/temple_sanctum_1780851555702.png';

if (!fs.existsSync(file1) || !fs.existsSync(file2)) {
  console.log('One of the files does not exist.');
  process.exit(0);
}

const buf1 = fs.readFileSync(file1);
const buf2 = fs.readFileSync(file2);

if (buf1.equals(buf2)) {
  console.log('Files are identical!');
} else {
  console.log('Files are different. Sizes: File1 = ' + buf1.length + ', File2 = ' + buf2.length);
}
