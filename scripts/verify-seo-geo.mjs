import { stat } from 'node:fs/promises';
import path from 'node:path';
import { products, productDescription, productDetailContent, productFaqs, productHasRentalSearchIntent, productHeadingTitle, productKeyFeatures, productLeadTimeProfile, productManufacturerSupplyNote, productMetaDescription, productOrderConfirmation, productPrimaryKeyword, productSeoTitle, sanitizeB2BCopy } from '../src/data/site.ts';
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

const contentRepetition = new Map();
for (const product of products) {
  const key = product.category + ' | ' + productDetailContent(product).purpose.trim().toLowerCase().replace(/\s+/g, ' ');
  contentRepetition.set(key, (contentRepetition.get(key) ?? 0) + 1);
}
for (const [key, count] of contentRepetition) {
  if (count >= 5) failures.push('Product detail purpose is shared by ' + count + ' products: ' + key.slice(0, 110));
}

for (const product of products) {
  const primaryKeyword = productPrimaryKeyword(product);
  const heading = productHeadingTitle(product);
  const meta = productMetaDescription(product);
  const leadDescription = sanitizeB2BCopy(product, productDescription(product));
  const faqs = productFaqs(product);
  const leadTime = productLeadTimeProfile(product);
  const orderConfirmation = productOrderConfirmation(product);
  const detail = productDetailContent(product);
  const features = productKeyFeatures(product).join(' ');
  const faqText = faqs.map((faq) => `${faq.question} ${faq.answer}`).join(' ');
  const generatedCopy = [leadDescription, detail.purpose, orderConfirmation, faqText, features]
    .map((text) => sanitizeB2BCopy(product, text))
    .join(' ');
  if (!primaryKeyword || !heading || !meta) failures.push(product.slug + ': missing a public SEO field');
  if (faqs.length < 6) failures.push(product.slug + ': expected at least 6 product FAQs, found ' + faqs.length);
  if (new Set(faqs.map((faq) => faq.question.trim().toLowerCase())).size < 6) failures.push(product.slug + ': product FAQs are not sufficiently distinct');
  if (!/^(?:5–7|6–8|7–9|8–10|9–11|10–12|11–14|5–12|7–14) Work Days$/.test(leadTime.range)) failures.push(product.slug + ': invalid size-based lead-time range');
  if (!orderConfirmation.includes(leadTime.range) || /7-10 Work Days/i.test(orderConfirmation)) failures.push(product.slug + ': order confirmation does not use the size-based lead-time profile');
  if (!productHasRentalSearchIntent(product) && /\b(?:for rent|rentals? available|book (?:a )?rental|local rental service|hire this)\b/i.test(leadDescription)) failures.push(product.slug + ': ordinary B2B lead description reads like a rental-service offer');
  if (productHasRentalSearchIntent(product) && !/commercial fleet procurement intent|local consumer rental service/i.test(productManufacturerSupplyNote(product))) failures.push(product.slug + ': missing manufacturer-supply clarification for rental search intent');
  if (/\bcommercial\s+commercial\b|party commercial fleets|\b(\w+)(?:\s+\1)+\b/i.test(leadDescription + ' ' + orderConfirmation)) failures.push(product.slug + ': generated copy contains a repeated or malformed phrase');
  const grammarIssue = generatedCopy.match(/\b(?:the\s+the|this\s+the|the\s+a|the\s+an|commercial\s+commercial|rental\s+rental|slide\s+slide|and\s+and)\b/i);
  if (grammarIssue) failures.push(product.slug + ': generated copy contains malformed phrase “' + grammarIssue[0] + '”');
  if (/\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?m\s+m\b/i.test(product.dimensions)) failures.push(product.slug + ': dimensions contain a duplicated unit');
  if (!/custom dimensions available/i.test(product.dimensions) && /\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*m\b/i.test(product.dimensions)
    && !/^\d+(?:\.\d+)?\s+x\s+\d+(?:\.\d+)?\s+x\s+\d+(?:\.\d+)?\s+m$/i.test(product.dimensions.trim())) {
    failures.push(product.slug + ': metric dimensions are not normalized to “L x W x H m” format');
  }
  if (!detail.purpose || !features.trim()) failures.push(product.slug + ': missing product-specific purpose or features');
}

const whiteBounce = products.find((product) => product.productSlug === 'modern-white-bounce-houses');
if (whiteBounce) {
  const whiteCopy = [productDescription(whiteBounce), productDetailContent(whiteBounce).purpose, ...productKeyFeatures(whiteBounce)].join(' ').toLowerCase();
  if (!whiteBounce.dimensions.startsWith('3 x 2.5 x 2.5 m')) failures.push('White Bounce House: listed dimensions were not normalized correctly');
  if (/\b(slide|ball pit|basketball hoop)\b/.test(whiteCopy)) failures.push('White Bounce House: copy claims a combo feature not present in its supplied product name');
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
