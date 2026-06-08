const fs = require('fs');
const path = require('path');

const file1 = path.join(__dirname, '..', 'public', 'images', 'hero-temple-sanctum.png');
const file2 = 'C:/Users/Avadhesh Singh/.gemini/antigravity-ide/brain/3238d270-2cb5-4f9a-87b3-2a282d9ab916/.tempmediaStorage/media_3238d270-2cb5-4f9a-87b3-2a282d9ab916_1780869274844.jpg';

if (!fs.existsSync(file1) || !fs.existsSync(file2)) {
  console.log('One of the files does not exist.');
  process.exit(0);
}

const buf1 = fs.readFileSync(file1);
const buf2 = fs.readFileSync(file2);

if (buf1.equals(buf2)) {
  console.log('Files are identical! The hero background image was indeed overwritten with the user\'s uploaded reference/screenshot.');
} else {
  console.log('Files are different. Sizes: File1 = ' + buf1.length + ', File2 = ' + buf2.length);
}
