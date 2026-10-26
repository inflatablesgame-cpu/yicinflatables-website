import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const workRoot = path.resolve(process.cwd(), '..');
const categories = ['Bounce House', 'Bounce House Combo'];

for (const category of categories) {
  const sourceCategory = path.join(workRoot, 'product', category);
  const destinationCategory = path.join(workRoot, 'webp', 'product', category);
  const productEntries = await readdir(sourceCategory, { withFileTypes: true });

  for (const productEntry of productEntries.filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const source = path.join(sourceCategory, productEntry.name);
    const destination = path.join(destinationCategory, productEntry.name);
    const files = (await readdir(source))
      .filter((file) => /\.(webp|png|jpe?g)$/i.test(file))
      .sort((a, b) => {
        const left = Number.parseInt(a.match(/^(\d+)/)?.[1] ?? '999', 10);
        const right = Number.parseInt(b.match(/^(\d+)/)?.[1] ?? '999', 10);
        return left - right || a.localeCompare(b);
      })
      .slice(0, 5);
    if (files.length < 5) throw new Error(`${category}/${productEntry.name}: expected at least 5 images, found ${files.length}`);

    await mkdir(destination, { recursive: true });
    await Promise.all(files.map((file, index) => sharp(path.join(source, file))
      .rotate()
      .webp({ quality: 82, effort: 5 })
      .toFile(path.join(destination, `${index + 1}.webp`))));
  }
}

console.log(`Converted new Bounce House and Bounce House Combo source folders to WebP.`);
