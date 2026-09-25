import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const catalog = JSON.parse(await readFile(path.join(rootDir, 'src/data/catalog.json'), 'utf8'));
const bubbleTentSource = '/assets/product/Inflatable%20Tent/3m%20diameter%20%2B%201.7m%20tunnel%2C%200.8%20mm%20PVC%20%2B0.6mmPVC%20%20%20%20inflatable%20bubble%20tent%20with%20balloons/';
const bubbleTentSafe = '/assets/product/inflatable-tent-bubble-tent/';

const toFilePath = (assetUrl) => path.join(publicDir, decodeURIComponent(assetUrl.replace(/^\//, '')));
const thumbUrl = (assetUrl) => assetUrl
  .replace('/assets/product/', '/assets/product-thumbs/')
  .replace(/\.(jpe?g|png|webp)$/i, '.webp');

async function writeWebp(sourceUrl, outputUrl, width, quality = 74) {
  const outputPath = toFilePath(outputUrl);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(toFilePath(sourceUrl))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(outputPath);
}

const productSources = new Set(
  catalog.products.map((product) => product.slug === 'inflatable-tent--diameter-1-7m-tunnel-0-8-mm-pvc-0-6mmpvc-inflatable-bubble-tent-with-balloons-2'
    ? product.images[0].replace(bubbleTentSource, bubbleTentSafe)
    : product.images[0]),
);

let productCount = 0;
for (const sourceUrl of productSources) {
  await writeWebp(sourceUrl, thumbUrl(sourceUrl), 720, 72);
  productCount += 1;
}

const aboutImages = [
  ['/assets/guangzhou-inflatable-manufacturer-factory-workshop-collage.jpg', '/assets/optimized/about/factory-collage.webp', 800],
  ['/assets/%E6%9D%90%E6%96%99.webp', '/assets/optimized/about/materials.webp', 760],
  ['/assets/YIC_customer_feedback_2column_original_layout.webp', '/assets/optimized/about/customer-feedback.webp', 700],
  ['/assets/commercial-inflatable-manufacturer-clients-exhibition-2026.webp', '/assets/optimized/about/exhibition.webp', 1000],
  ['/assets/%E6%96%B0LOGO.webp', '/assets/yic-logo-128.webp', 128, 80],
  ['/assets/about%E9%A1%B5/commercial-inflatable-manufacturer-yic-raw-material-inspection.webp', '/assets/optimized/about/raw-material.webp', 320],
  ['/assets/about%E9%A1%B5/commercial-inflatable-manufacturing-auto-cutting.webp', '/assets/optimized/about/auto-cutting.webp', 320],
  ['/assets/about%E9%A1%B5/commercial-inflatable-manufacturer-yic-in-process-inspection.webp', '/assets/optimized/about/in-process.webp', 320],
  ['/assets/about%E9%A1%B5/commercial-inflatable-manufacturing-capability.webp', '/assets/optimized/about/inflation-test.webp', 320],
  ['/assets/commercial-inflatable-manufacturer-detailed-inspection.webp', '/assets/optimized/about/detailed-inspection.webp', 320],
  ['/assets/about%E9%A1%B5/commercial-inflatable-manufacturer-yic-factory-packing-inspection.webp', '/assets/optimized/about/packing-inspection.webp', 320],
];

for (const [sourceUrl, outputUrl, width, quality] of aboutImages) {
  await writeWebp(sourceUrl, outputUrl, width, quality);
}

console.log(`Created ${productCount} product thumbnails and ${aboutImages.length} optimized About assets.`);
