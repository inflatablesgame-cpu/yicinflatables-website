import { stat } from 'node:fs/promises';
import path from 'node:path';
import { products, productDescription, productFaqs, productHasRentalSearchIntent, productHeadingTitle, productLeadTimeProfile, productManufacturerSupplyNote, productMetaDescription, productOrderConfirmation, productPrimaryKeyword, productSeoTitle, sanitizeB2BCopy } from '../src/data/site.ts';
import { blogArticles } from '../src/data/blog.ts';
import { getBuyerGuideProfile } from '../src/data/buyer-guides.ts';
import { caseStudyCards } from '../src/data/case-studies.ts';

const failures = [];
const publicRoot = path.resolve('public');

const duplicates = (label, values) => {
  const groups = new Map();
  for (const value of values) {
    const normalized = String(value).trim().toLowerCase().replace(/\s+/g, ' ');
    if (!normalized) continue;
    groups.set(normalized, (groups.get(normalized) ?? 0) + 1);
  }
  const duplicateCount = [...groups.values()].filter((count) => count > 1).length;
  if (duplicateCount) failures.push(label + ': ' + duplicateCount + ' duplicate value group(s)');
};

duplicates('Primary keywords', products.map(productPrimaryKeyword));
duplicates('Product H1 titles', products.map(productHeadingTitle));
duplicates('SEO titles', products.map(productSeoTitle));
duplicates('Meta descriptions', products.map(productMetaDescription));
duplicates('Product lead descriptions', products.map((product) => sanitizeB2BCopy(product, productDescription(product))));

for (const product of products) {
  const primaryKeyword = productPrimaryKeyword(product);
  const heading = productHeadingTitle(product);
  const meta = productMetaDescription(product);
  const leadDescription = sanitizeB2BCopy(product, productDescription(product));
  const faqs = productFaqs(product);
  const leadTime = productLeadTimeProfile(product);
  const orderConfirmation = productOrderConfirmation(product);
  if (!primaryKeyword || !heading || !meta) failures.push(product.slug + ': missing a public SEO field');
  if (faqs.length < 6) failures.push(product.slug + ': expected at least 6 product FAQs, found ' + faqs.length);
  if (new Set(faqs.map((faq) => faq.question.trim().toLowerCase())).size < 6) failures.push(product.slug + ': product FAQs are not sufficiently distinct');
  if (!/^(?:5–7|6–8|7–9|8–10|9–11|10–12|11–14|5–12|7–14) Work Days$/.test(leadTime.range)) failures.push(product.slug + ': invalid size-based lead-time range');
  if (!orderConfirmation.includes(leadTime.range) || /7-10 Work Days/i.test(orderConfirmation)) failures.push(product.slug + ': order confirmation does not use the size-based lead-time profile');
  if (!productHasRentalSearchIntent(product) && /\b(rental|rent|hire)\b/i.test(leadDescription)) failures.push(product.slug + ': ordinary B2B lead description still leads with rental wording');
  if (productHasRentalSearchIntent(product) && !/commercial fleet procurement intent|local consumer rental service/i.test(productManufacturerSupplyNote(product))) failures.push(product.slug + ': missing manufacturer-supply clarification for rental search intent');
}

for (const article of blogArticles) {
  const profile = getBuyerGuideProfile(article.category);
  if (!profile.decision || profile.checklist.length < 3 || profile.risks.length < 3 || profile.factoryQuestions.length < 3 || profile.faqs.length < 2) {
    failures.push('Blog ' + article.slug + ': missing buyer-guide decision content');
  }
}

const buyerQuestionArticles = blogArticles.filter((article) => article.answer);
if (buyerQuestionArticles.length !== 10) {
  failures.push('Expected 10 distinct procurement question articles, found ' + buyerQuestionArticles.length);
}
duplicates('Buyer guide SEO titles', buyerQuestionArticles.map((article) => article.metaTitle ?? article.title));
for (const article of buyerQuestionArticles) {
  if ((article.metaTitle ?? article.title).length + ' | YIC'.length > 62) failures.push('Blog ' + article.slug + ': SEO title exceeds the site title limit');
  if (article.description.length > 158) failures.push('Blog ' + article.slug + ': meta description exceeds the site description limit');
  if (!article.buyerFramework || article.buyerFramework.checklist.length < 4 || article.buyerFramework.risks.length < 3 || article.buyerFramework.factoryQuestions.length < 4) {
    failures.push('Blog ' + article.slug + ': missing article-specific procurement framework');
  }
  if (!article.faqs || article.faqs.length < 4 || new Set(article.faqs.map((faq) => faq.question.trim().toLowerCase())).size !== article.faqs.length) {
    failures.push('Blog ' + article.slug + ': missing or duplicate article-specific FAQs');
  }
  for (const link of article.internalLinks ?? []) {
    if (!link.href.startsWith('/')) failures.push('Blog ' + article.slug + ': internal link is not a local path: ' + link.href);
  }
  for (const slug of article.relatedProductSlugs ?? []) {
    if (!products.some((product) => product.productSlug === slug)) failures.push('Blog ' + article.slug + ': unknown related product slug ' + slug);
  }
  if (article.image) {
    const pathname = decodeURIComponent(article.image.src.split('?')[0]);
    const assetPath = path.resolve(publicRoot, '.' + pathname);
    try {
      const file = await stat(assetPath);
      if (!file.isFile() || file.size === 0) failures.push('Blog ' + article.slug + ': missing or empty image ' + article.image.src);
    } catch {
      failures.push('Blog ' + article.slug + ': missing image ' + article.image.src);
    }
  }
}

for (const caseStudy of caseStudyCards) {
  if (!caseStudy.description || !caseStudy.buyerFocus || !caseStudy.alt) failures.push('Case study ' + caseStudy.id + ': missing citation-ready project detail');
  if (!caseStudy.relatedProductSlug && !caseStudy.relatedCategorySlug) failures.push('Case study ' + caseStudy.id + ': missing related catalog path');
  for (const asset of [caseStudy.image, caseStudy.buyerReference?.image].filter(Boolean)) {
    const pathname = decodeURIComponent(asset.split('?')[0]);
    const assetPath = path.resolve(publicRoot, '.' + pathname);
    try {
      const file = await stat(assetPath);
      if (!file.isFile() || file.size === 0) failures.push('Case study ' + caseStudy.id + ': missing or empty asset ' + asset);
    } catch {
      failures.push('Case study ' + caseStudy.id + ': missing asset ' + asset);
    }
  }
}

if (failures.length) {
  console.error('SEO/GEO release validation failed (' + failures.length + ' issue' + (failures.length === 1 ? '' : 's') + '):');
  for (const failure of failures) console.error('- ' + failure);
  process.exit(1);
}

console.log('Verified SEO/GEO release quality for ' + products.length + ' products, ' + blogArticles.length + ' buyer guides and ' + caseStudyCards.length + ' case studies.');
