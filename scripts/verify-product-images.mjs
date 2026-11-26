import { stat } from 'node:fs/promises';
import path from 'node:path';
import catalog from '../src/data/catalog.json' with { type: 'json' };

const publicRoot = path.resolve('public');
const failures = [];
const bubbleTentSource = '/assets/product/Inflatable%20Tent/3m%20diameter%20%2B%201.7m%20tunnel%2C%200.8%20mm%20PVC%20%2B0.6mmPVC%20%20%20%20inflatable%20bubble%20tent%20with%20balloons/';
const bubbleTentSafe = '/assets/product/inflatable-tent-bubble-tent/';

async function verifyAsset(url, label) {
  const pathname = decodeURIComponent(url.split('?')[0]);
  const assetPath = path.resolve(publicRoot, `.${pathname}`);
  if (!assetPath.startsWith(`${publicRoot}${path.sep}`)) {
    failures.push(`${label}: invalid image path ${url}`);
    return;
  }
  try {
    const file = await stat(assetPath);
    if (!file.isFile() || file.size === 0) failures.push(`${label}: missing or empty ${url}`);
  } catch {
    failures.push(`${label}: missing ${url}`);
  }
}

for (const product of catalog.products) {
  const productImages = product.images.map((imageUrl) => /bubble tent with balloons/i.test(product.sourceName)
    ? imageUrl.replace(bubbleTentSource, bubbleTentSafe)
    : imageUrl);
  for (const imageUrl of productImages) {
    await verifyAsset(imageUrl, product.slug);
    const galleryUrl = imageUrl.split('?')[0]
      .replace('/assets/product/', '/assets/product-gallery/')
      .replace(/\.(jpe?g|png|webp)$/i, '.webp');
    await verifyAsset(galleryUrl, `${product.slug} gallery thumbnail`);
  }
  await verifyAsset(`/assets/product-detail/${product.slug}.webp`, `${product.slug} detail image`);
}

for (const asset of [
  '/assets/optimized/blog/manufacturer-inspection.webp',
  '/assets/optimized/blog/en14960-document.webp',
  '/assets/optimized/blog/ul-document.webp',
  '/assets/optimized/blog/design-process.webp',
  '/assets/optimized/blog/workshop-interior.webp',
  '/assets/optimized/blog/inspection-packaging.webp',
  '/assets/optimized/blog/packing-shipping.webp',
]) {
  await verifyAsset(asset, 'Blog image');
}

if (failures.length) {
  console.error(`Product image validation failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Verified ${catalog.products.length} products, ${catalog.products.reduce((count, product) => count + product.images.length, 0)} gallery images, and optimized product detail/gallery assets.`);
