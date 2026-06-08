const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/Avadhesh Singh/.gemini/antigravity-ide/brain/3238d270-2cb5-4f9a-87b3-2a282d9ab916';
const files = fs.readdirSync(brainDir);

files.forEach(file => {
  if (file.endsWith('.png') || file.endsWith('.jpg')) {
    const filePath = path.join(brainDir, file);
    const buffer = fs.readFileSync(filePath);
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
      const width = buffer.readInt32BE(16);
      const height = buffer.readInt32BE(20);
      console.log(`${file}: PNG Dimensions - Width: ${width}, Height: ${height}`);
    } else if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
      // Parse JPEG height/width
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
  }
});
