import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const inputDir = './input';
const outputDir = './output';

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(inputDir, { recursive: true });

// you can change the height if you want
const height = undefined;

// you can change the sizes if you want
const sizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

const files = await fs.readdir(inputDir);

for (const file of files) {
  const ext = path.extname(file);
  const name = path.basename(file, ext);
  for (const size of sizes) {
    const output = path.join(outputDir, `${name}_${size}${ext}`);
    await sharp(path.join(inputDir, file)).resize(size, height).toFile(output);
  }
}
