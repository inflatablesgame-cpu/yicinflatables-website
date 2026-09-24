import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const workRoot = path.resolve(projectRoot, '..');
const webpRoot = path.join(workRoot, 'webp');
const productRoot = path.join(webpRoot, 'product');
const publicAssetsRoot = path.join(projectRoot, 'public', 'assets');
const dataRoot = path.join(projectRoot, 'src', 'data');

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'product';
}

function assetUrl(relativePath) {
  return `/assets/${relativePath
    .split(path.sep)
    .map((segment) => encodeURIComponent(segment))
    .join('/')}`;
}

function cleanCategoryName(value) {
  return value.replace(/\s+所有材料.*$/u, '').replace(/\s{2,}/g, ' ').trim();
}

function cleanProductName(value) {
  const withoutMaterialNotes = value
    .replace(/材料.*?PVC/iu, ' ')
    .replace(/材料是牛津布/iu, ' ')
    .replace(/所有材料.*$/u, ' ');
  return withoutMaterialNotes
    .replace(/^\s*[\d.]+\s*m\s+Dia\s+/i, '')
    .replace(/^\s*[\d.]+(?:\s*[x×]\s*[\d.]+)+(?:\s*m)?\s+/i, '')
    .replace(/^\s*[\d.]+\s*m\s+/i, '')
    .replace(/[\u4e00-\u9fff]+/gu, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function sortImages(left, right) {
  const leftNumber = Number.parseInt(left.match(/^(\d+)/)?.[1] ?? '999', 10);
  const rightNumber = Number.parseInt(right.match(/^(\d+)/)?.[1] ?? '999', 10);
  return leftNumber - rightNumber || left.localeCompare(right);
}

function materialFor(categoryName, productName) {
  if (/bumper ball/i.test(categoryName)) return 'Commercial TPU';
  const thickness = productName.match(/(0\.\d+)\s*mm/i)?.[1];
  if (thickness) return `${thickness}mm commercial PVC`; 
  return 'Commercial grade 0.55mm (1000D, 18 OZ) PVC';
}

// These are common commercial-intent modifiers used in product searches.
// They distinguish genuinely duplicated catalog names without exposing
// internal list numbers or technical dimensions in the public URL.
const PRODUCT_INTENT_VARIANTS = [
  'commercial',
  'for-sale',
  'rental',
  'wholesale',
  'custom',
  'supplier',
  'factory',
  'oem',
  'odm',
];

function containsIntentVariant(slug, variant) {
  return slug === variant || slug.includes(`-${variant}-`) || slug.endsWith(`-${variant}`);
}

function stripIntentVariants(slug) {
  return slug
    .replace(/(?:^|-)for-sale(?=-|$)/g, '')
    .replace(/(?:^|)-(?:commercial|rental|wholesale|custom|supplier|factory|oem|odm)(?=-|$)/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function duplicateVariant(baseSlug, index, usedSlugs) {
  const availableVariants = PRODUCT_INTENT_VARIANTS.filter(
    (variant) => !containsIntentVariant(baseSlug, variant),
  );

  // Prefer a search-intent modifier that is not already used by another
  // duplicate in the same category. This keeps URLs readable and avoids
  // forms such as "for-sale-for-sale".
  const preferred = availableVariants.find((variant) => !usedSlugs.has(`${baseSlug}-${variant}`));
  if (preferred) return preferred;

  // This is only a defensive fallback for unusually large duplicate groups.
  // It remains semantic and never exposes an internal numeric index.
  return availableVariants[index % availableVariants.length] ?? 'custom';
}

async function buildCatalog() {
  const categoryEntries = await readdir(productRoot, { withFileTypes: true });
  const categories = [];
  const products = [];

  for (const categoryEntry of categoryEntries.filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name))) {
    const categoryName = cleanCategoryName(categoryEntry.name);
    const categorySlug = slugify(categoryName);
    const categoryPath = path.join(productRoot, categoryEntry.name);
    const productEntries = await readdir(categoryPath, { withFileTypes: true });
    const categoryProducts = [];

    for (const [index, productEntry] of productEntries.filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name)).entries()) {
      const productPath = path.join(categoryPath, productEntry.name);
      const imageEntries = (await readdir(productPath, { withFileTypes: true }))
        .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.webp'))
        .map((entry) => entry.name)
        .sort(sortImages)
        .slice(0, 5);
      if (!imageEntries.length) continue;

      const title = cleanProductName(productEntry.name) || `${categoryName} Product ${index + 1}`;
      const slug = `${categorySlug}--${slugify(title)}-${index + 1}`;
      const relativeDirectory = path.join('product', categoryEntry.name, productEntry.name);
      const images = imageEntries.map((imageName) => assetUrl(path.join(relativeDirectory, imageName)));
      const product = {
        slug,
        productSlug: slugify(title),
        category: categoryName,
        categorySlug,
        title,
        sourceName: productEntry.name,
        material: materialFor(categoryName, productEntry.name),
        images,
        dimensions: productEntry.name.match(/^\s*([^\s]+(?:\s*[x×]\s*[^\s]+)*\s*(?:m|Dia)?)/i)?.[1] ?? '',
        excerpt: `Commercial ${categoryName.toLowerCase()} built for party rental operators, family entertainment centers, and event venues.`,
      };
      products.push(product);
      categoryProducts.push(product);
    }

    // Keep public URLs readable. Only products with the same category and
    // title need a disambiguating, meaningful suffix such as their size.
    const slugCounts = new Map();
    for (const product of categoryProducts) {
      slugCounts.set(product.productSlug, (slugCounts.get(product.productSlug) ?? 0) + 1);
    }
    const usedSlugs = new Set();
    const duplicateIndexes = new Map();
    for (const product of categoryProducts) {
      const baseSlug = product.productSlug;
      const variantBase = stripIntentVariants(baseSlug) || baseSlug;
      let publicSlug = baseSlug;
      if ((slugCounts.get(baseSlug) ?? 0) > 1) {
        const duplicateIndex = duplicateIndexes.get(baseSlug) ?? 0;
        publicSlug = `${variantBase}-${duplicateVariant(variantBase, duplicateIndex, usedSlugs)}`;
        duplicateIndexes.set(baseSlug, duplicateIndex + 1);
      }
      while (usedSlugs.has(publicSlug)) {
        const duplicateIndex = duplicateIndexes.get(baseSlug) ?? 0;
        publicSlug = `${variantBase}-${duplicateVariant(variantBase, duplicateIndex, usedSlugs)}`;
        duplicateIndexes.set(baseSlug, duplicateIndex + 1);
      }
      product.productSlug = publicSlug;
      usedSlugs.add(publicSlug);
    }

    categories.push({
      name: categoryName,
      slug: categorySlug,
      count: categoryProducts.length,
      heroImage: categoryProducts[0]?.images[0] ?? '',
      products: categoryProducts.map((product) => product.slug),
    });
  }

  return { generatedAt: new Date().toISOString(), categories, products };
}

await mkdir(publicAssetsRoot, { recursive: true });
await mkdir(dataRoot, { recursive: true });

  if (await readdir(webpRoot).then(() => true).catch(() => false)) {
  await cp(webpRoot, publicAssetsRoot, { recursive: true, force: true });
  const catalog = await buildCatalog();
  await writeFile(path.join(dataRoot, 'catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
  console.log(`Synced ${catalog.products.length} products across ${catalog.categories.length} categories.`);
} else {
  console.log('WebP source directory not found; keeping the checked-in public assets and catalog.');
}
