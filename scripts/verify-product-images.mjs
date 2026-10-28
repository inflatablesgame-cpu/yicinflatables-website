import { stat } from 'node:fs/promises';
import path from 'node:path';
import catalog from '../src/data/catalog.json' with { type: 'json' };

const publicRoot = path.resolve('public');
const failures = [];

for (const product of catalog.products) {
  for (const imageUrl of product.images) {
    const pathname = decodeURIComponent(imageUrl.split('?')[0]);
    const assetPath = path.resolve(publicRoot, `.${pathname}`);
    if (!assetPath.startsWith(`${publicRoot}${path.sep}`)) {
      failures.push(`${product.slug}: invalid image path ${imageUrl}`);
      continue;
    }
    try {
      const file = await stat(assetPath);
      if (!file.isFile() || file.size === 0) failures.push(`${product.slug}: missing or empty ${imageUrl}`);
    } catch {
      failures.push(`${product.slug}: missing ${imageUrl}`);
    }
  }
}

if (failures.length) {
  console.error(`Product image validation failed (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Verified ${catalog.products.length} products and ${catalog.products.reduce((count, product) => count + product.images.length, 0)} product images.`);
