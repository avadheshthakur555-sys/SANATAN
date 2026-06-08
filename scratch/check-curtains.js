const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join(__dirname, '..', 'public', 'images');
const files = ['hero-curtain.jpg', 'hero-curtain-alt.jpg'];

files.forEach(file => {
  const filePath = path.join(publicImagesDir, file);
  if (fs.existsSync(filePath)) {
    const buffer = fs.readFileSync(filePath);
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
      let offset = 2;
      while (offset < buffer.length) {
        if (buffer[offset] !== 0xFF) break;
        const marker = buffer[offset + 1];
        if (marker === 0xD9) break;
        if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
          const height = buffer.readUInt16BE(offset + 5);
          const width = buffer.readUInt16BE(offset + 7);
          console.log(`${file}: JPEG Dimensions - Width: ${width}, Height: ${height}`);
          break;
        }
        const length = buffer.readUInt16BE(offset + 2);
        offset += 2 + length;
      }
    } else {
      console.log(`${file}: Unknown format`);
    }
  } else {
    console.log(`${file} does not exist.`);
  }
});
