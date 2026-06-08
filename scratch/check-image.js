const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'images', 'hero-temple-sanctum.png');

if (!fs.existsSync(filePath)) {
  console.error('File does not exist:', filePath);
  process.exit(1);
}

const buffer = fs.readFileSync(filePath);

if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
  // It is a JPEG
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xFF) {
      console.error('Invalid marker at offset', offset, buffer[offset]);
      break;
    }
    const marker = buffer[offset + 1];
    if (marker === 0xD9) {
      console.log('Reached EOI (End of Image)');
      break;
    }
    // SOF markers
    if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      console.log(`JPEG Dimensions - Width: ${width}, Height: ${height}`);
      break;
    }
    // Skip this segment
    const length = buffer.readUInt16BE(offset + 2);
    offset += 2 + length;
  }
} else if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
  const width = buffer.readInt32BE(16);
  const height = buffer.readInt32BE(20);
  console.log(`PNG Dimensions - Width: ${width}, Height: ${height}`);
} else {
  console.log('Not a standard JPEG or PNG. Magic bytes:', buffer[0].toString(16), buffer[1].toString(16));
}
