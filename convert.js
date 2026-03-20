const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/subcategories');

async function processDir() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.png')) {
      const src = path.join(dir, file);
      const dest = path.join(dir, file.replace('.png', '.webp'));
      console.log('Converting', file);
      await sharp(src)
        .resize({ width: 200 }) // Subcategory icons only need small resolutions
        .webp({ quality: 80, effort: 6 })
        .toFile(dest);
      fs.unlinkSync(src); // Remove original huge PNG
    }
  }
  console.log("All PNGs converted and optimized successfully.");
}

processDir().catch(console.error);
