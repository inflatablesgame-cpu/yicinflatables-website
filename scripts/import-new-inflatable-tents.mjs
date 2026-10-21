import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const workRoot = path.resolve(process.cwd(), '..');
const names = [
  '10m Dia 材料Oxford      white large inflatable igloo tent',
  '10x10x2m    inflatable maze for sale',
  '14x6x3.8m    commercial inflatable tent for party',
  '6m Dia  材料Oxford           white inflatable dome tent',
  '6x6m 材料Oxford           white inflatable air cube tent',
  '尺寸定制               inflatable glamping tent for sale',
  '尺寸定制              christmas inflatable gingerbread house',
  '尺寸定制              winter inflatable gingerbread house',
  '尺寸定制          inflatable emergency tent',
  '尺寸定制         inflatable geodesic dome',
  '尺寸定制  材料Oxford             inflatable dome shelter',
  '尺寸定制  材料Oxford           inflatable igloo dome tent',
  '尺寸定制  材料Oxford           inflatable igloo party tent',
  '尺寸定制 材料Oxford      silver airdome inflatable tents',
];

for (const name of names) {
  const source = path.join(workRoot, 'product', 'Inflatable Tent', name);
  const destination = path.join(workRoot, 'webp', 'product', 'Inflatable Tent', name);
  await mkdir(destination, { recursive: true });
  const files = (await readdir(source))
    .filter((file) => /\.(webp|png|jpe?g)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .slice(0, 5);
  if (files.length !== 5) throw new Error(`${name}: expected 5 images, found ${files.length}`);
  await Promise.all(files.map((file, index) => sharp(path.join(source, file))
    .rotate()
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(destination, `${index + 1}.webp`))));
}

console.log(`Converted ${names.length} Inflatable Tent products with five ordered WebP images each.`);
