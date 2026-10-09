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
    // Some catalog exports are square canvases with large white borders.
    // Trim only contiguous white edge pixels before making the card image;
    // this keeps the product visible without changing the original gallery.
    .trim({ background: { r: 255, g: 255, b: 255 }, threshold: 12 })
    .resize({ width, height: Math.round(width * 0.75), fit: 'cover', position: 'centre', withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(outputPath);
}

// Full-width content images should keep their original composition. Unlike
// catalog thumbnails, these are resized without trimming or forced cropping.
async function writeContentWebp(sourceUrl, outputUrl, width, quality = 70) {
  const outputPath = toFilePath(outputUrl);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(toFilePath(sourceUrl))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(outputPath);
}

async function writeHeroMobile(sourceUrl, outputUrl) {
  const outputPath = toFilePath(outputUrl);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(toFilePath(sourceUrl))
    .rotate()
    .resize({ width: 780, height: 920, fit: 'cover', position: 'centre' })
    .webp({ quality: 65, effort: 5 })
    .toFile(outputPath);
}

const productSources = new Set(
  catalog.products.map((product) => /bubble tent with balloons/i.test(product.sourceName)
    ? product.images[0].replace(bubbleTentSource, bubbleTentSafe)
    : product.images[0]),
);

let productCount = 0;
for (const sourceUrl of productSources) {
  await writeWebp(sourceUrl, thumbUrl(sourceUrl), 720, 72);
  productCount += 1;
}

let categoryCardCount = 0;
for (const category of catalog.categories) {
  await writeWebp(category.heroImage, `/assets/optimized/category-cards/${category.slug}.webp`, 480, 64);
  categoryCardCount += 1;
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

const homeImages = [
  ['/assets/%E5%B7%A5%E5%8E%82%E5%86%85%E9%83%A8%E5%B1%95%E7%A4%BA.webp', '/assets/optimized/home/factory-construction.webp', 980, 70],
  ['/assets/commercial-inflatable-manufacturer-workshop-interior.webp', '/assets/optimized/home/workshop-interior.webp', 1000, 70],
  ['/assets/commercial-inflatable-manufacturer-clients-exhibition-2026.webp', '/assets/optimized/home/exhibition.webp', 1100, 70],
  ['/assets/%E7%94%9F%E6%88%90%E6%B5%81%E7%A8%8B%E5%9B%BE/commercial-inflatable-manufacturer-yic-design-process.webp', '/assets/optimized/home/process-design.webp', 520, 68],
  ['/assets/%E7%94%9F%E6%88%90%E6%B5%81%E7%A8%8B%E5%9B%BE/commercial-inflatable-manufacturer-yic-material-cutting.webp', '/assets/optimized/home/process-material-cutting.webp', 520, 68],
  ['/assets/%E7%94%9F%E6%88%90%E6%B5%81%E7%A8%8B%E5%9B%BE/commercial-inflatable-manufacturer-yic-sewing-production.webp', '/assets/optimized/home/process-sewing.webp', 520, 68],
  ['/assets/%E7%94%9F%E6%88%90%E6%B5%81%E7%A8%8B%E5%9B%BE/commercial-inflatable-manufacturer-yic-heat-sealing-splicing.webp', '/assets/optimized/home/process-heat-sealing.webp', 520, 68],
  ['/assets/%E7%94%9F%E6%88%90%E6%B5%81%E7%A8%8B%E5%9B%BE/commercial-inflatable-manufacturer-yic-inflation-testing.webp', '/assets/optimized/home/process-inflation-test.webp', 520, 68],
  ['/assets/%E7%94%9F%E6%88%90%E6%B5%81%E7%A8%8B%E5%9B%BE/commercial-inflatable-manufacturer-yic-inspection-packaging.webp', '/assets/optimized/home/process-final-inspection.webp', 520, 68],
  ['/assets/%E7%94%9F%E6%88%90%E6%B5%81%E7%A8%8B%E5%9B%BE/commercial-inflatable-manufacturer-yic-packing-shipping.webp', '/assets/optimized/home/process-export-packing.webp', 520, 68],
  ['/assets/%E8%AF%81%E4%B9%A6/commercial-inflatable-manufacturer-UL-certified.webp', '/assets/optimized/home/certificate-ul.webp', 400, 68],
  ['/assets/%E8%AF%81%E4%B9%A6/commercial-inflatable-manufacturer-ROHS-reach-compliance.webp', '/assets/optimized/home/certificate-rohs-reach.webp', 400, 68],
  ['/assets/%E8%AF%81%E4%B9%A6/commercial-inflatable-manufacturer-ISO25649-certificate.webp', '/assets/optimized/home/certificate-iso25649.webp', 400, 68],
  ['/assets/%E8%AF%81%E4%B9%A6/commercial-inflatable-manufacturer-EN14960-certificate.webp', '/assets/optimized/home/certificate-en14960.webp', 400, 68],
];

for (const [sourceUrl, outputUrl, width, quality] of homeImages) {
  await writeContentWebp(sourceUrl, outputUrl, width, quality);
}

await writeHeroMobile('/assets/commercial-inflatable-manufacturer-hero.webp', '/assets/optimized/home/hero-mobile.webp');

console.log(`Created ${productCount} product thumbnails, ${categoryCardCount} mobile category-card assets, ${aboutImages.length} optimized About assets, ${homeImages.length} optimized Home assets, and a mobile Hero image.`);
