import { stat } from 'node:fs/promises';
import path from 'node:path';
import { products, productCardDescription, productCatalogSearchText, productComplianceProfile, productDescription, productDetailContent, productEvidenceProfile, productFaqs, productHasRentalSearchIntent, productHeadingTitle, productKeyFeatures, productLeadTimeProfile, productManufacturerSupplyNote, productMetaDescription, productOrderConfirmation, productPrimaryKeyword, productSeoTitle, sanitizeB2BCopy } from '../src/data/site.ts';
import { blogArticles } from '../src/data/blog.ts';
import { buyerQuestionArticles as procurementQuestionArticles } from '../src/data/buyer-question-articles.ts';
import { getBuyerGuideProfile } from '../src/data/buyer-guides.ts';
import { caseStudyCards } from '../src/data/case-studies.ts';
import { faqItems } from '../src/data/faq.ts';

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
  const evidence = productEvidenceProfile(product);
  const compliance = productComplianceProfile(product);
  const cardDescription = productCardDescription(product);
  const catalogSearchText = productCatalogSearchText(product);
  const features = productKeyFeatures(product).join(' ');
  const faqText = faqs.map((faq) => `${faq.question} ${faq.answer}`).join(' ');
  const faqJsonLdText = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  });
  const visibleProductText = [
    leadDescription,
    detail.productType,
    detail.primaryBuyer,
    detail.purpose,
    ...detail.applications.flatMap((item) => [item.title, item.text]),
    ...detail.planningPoints,
    ...detail.customization,
    detail.operationNote,
    ...detail.quoteItems,
    orderConfirmation,
    evidence.specification,
    evidence.procurement,
    evidence.productionRecord,
    compliance.summary,
    compliance.eu,
    compliance.us,
    compliance.fire,
    compliance.scope,
    'Minimum order quantity: 1 unit',
    cardDescription,
    catalogSearchText,
    faqText,
    faqJsonLdText,
    features,
  ].join(' ');
  const generatedCopy = [leadDescription, detail.purpose, orderConfirmation, faqText, features]
    .map((text) => sanitizeB2BCopy(product, text))
    .join(' ');
  if (!primaryKeyword || !heading || !meta) failures.push(product.slug + ': missing a public SEO field');
  if (faqs.length < 6) failures.push(product.slug + ': expected at least 6 product FAQs, found ' + faqs.length);
  if (!faqs.some((faq) => /minimum order quantity/i.test(faq.question) && /1 unit/i.test(faq.answer))) failures.push(product.slug + ': missing the confirmed 1-unit MOQ in product FAQ and FAQPage schema input');
  if (!/\bMOQ\s+1\s+unit\b/i.test(catalogSearchText)) failures.push(product.slug + ': missing the confirmed 1-unit MOQ from the product search index');
  if (new Set(faqs.map((faq) => faq.question.trim().toLowerCase())).size < 6) failures.push(product.slug + ': product FAQs are not sufficiently distinct');
  if (!/^(?:5–7|6–8|7–9|8–10|9–11|10–12|11–14|5–12|7–14) Work Days$/.test(leadTime.range)) failures.push(product.slug + ': invalid size-based lead-time range');
  if (!orderConfirmation.includes(leadTime.range) || /7-10 Work Days/i.test(orderConfirmation)) failures.push(product.slug + ': order confirmation does not use the size-based lead-time profile');
  if (!productHasRentalSearchIntent(product) && /\b(?:for rent|rentals? available|book (?:a )?rental|local rental service|hire this)\b/i.test(leadDescription)) failures.push(product.slug + ': ordinary B2B lead description reads like a rental-service offer');
  if (productHasRentalSearchIntent(product) && !/factory-direct supply for commercial operators|does not provide local consumer rentals/i.test(productManufacturerSupplyNote(product))) failures.push(product.slug + ': missing manufacturer-supply clarification for rental search intent');
  if (/\bcommercial\s+commercial\b|party commercial fleets|\b(\w+)(?:\s+\1)+\b/i.test(leadDescription + ' ' + orderConfirmation)) failures.push(product.slug + ': generated copy contains a repeated or malformed phrase');
  const grammarIssue = generatedCopy.match(/\b(?:the\s+the|this\s+the|the\s+a|the\s+an|commercial\s+commercial|rental\s+rental|slide\s+slide|and\s+and)\b/i);
  if (grammarIssue) failures.push(product.slug + ': generated copy contains malformed phrase “' + grammarIssue[0] + '”');
  const reviewAdjustIssue = visibleProductText.match(/\breview(?:\s+the)?\s+adjust\b/i);
  if (reviewAdjustIssue) failures.push(product.slug + ': generated product output contains malformed phrase “' + reviewAdjustIssue[0] + '”');
  if (/\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?m\s+m\b/i.test(product.dimensions)) failures.push(product.slug + ': dimensions contain a duplicated unit');
  if (!/custom dimensions available/i.test(product.dimensions) && /\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*x\s*\d+(?:\.\d+)?\s*m\b/i.test(product.dimensions)
    && !/^\d+(?:\.\d+)?\s+x\s+\d+(?:\.\d+)?\s+x\s+\d+(?:\.\d+)?\s+m$/i.test(product.dimensions.trim())) {
    failures.push(product.slug + ': metric dimensions are not normalized to “L x W x H m” format');
  }
  if (!detail.purpose || !features.trim()) failures.push(product.slug + ': missing product-specific purpose or features');
}

if (!faqItems.some((faq) => /minimum order quantity/i.test(faq.question) && /1 unit/i.test(faq.answer))) {
  failures.push('Site-wide buyer FAQ does not state the confirmed 1-unit MOQ');
}
const moqLeadTimeArticle = blogArticles.find((article) => article.slug === 'inflatable-moq-lead-time-and-quotation');
if (!moqLeadTimeArticle || !/minimum order quantity is 1 unit|orders starting at 1 unit/i.test(moqLeadTimeArticle.intro + ' ' + moqLeadTimeArticle.sections.map((section) => section.body).join(' '))) {
  failures.push('MOQ and lead-time guide does not state the confirmed 1-unit MOQ');
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

const buyerQuestionArticles = procurementQuestionArticles;
if (procurementQuestionArticles.length !== 10) {
  failures.push('Expected 10 distinct procurement question articles, found ' + procurementQuestionArticles.length);
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

const manufacturerGuide = buyerQuestionArticles.find((article) => article.slug === 'how-to-choose-commercial-inflatable-manufacturer');
if (!manufacturerGuide || !/Chinese Inflatable Suppliers/i.test(manufacturerGuide.title) || !/buy commercial inflatables online/i.test(manufacturerGuide.keywords)) {
  failures.push('Manufacturer sourcing guide is missing its Chinese-supplier and online-buying search intent');
}
if (manufacturerGuide && (!manufacturerGuide.sections.some((section) => /documented order trail/i.test(section.heading))
  || !manufacturerGuide.faqs?.some((faq) => /buy commercial inflatables online/i.test(faq.question))
  || !manufacturerGuide.relatedProductSlugs?.includes('shark-inflatable-water-slide-with-pool')
  || !manufacturerGuide.internalLinks?.some((link) => link.href === '/products/inflatable-water-slide/shark-inflatable-water-slide-with-pool/'))) {
  failures.push('Manufacturer sourcing guide is missing online-order guidance or the shark water-slide product link');
}

const sharkWaterSlide = products.find((product) => product.productSlug === 'shark-inflatable-water-slide-with-pool');
if (!sharkWaterSlide || !productFaqs(sharkWaterSlide).some((faq) => /different shark graphics or other marine designs/i.test(faq.question))) {
  failures.push('Shark water-slide product is missing its product-specific customization FAQ');
}

const onlineBuyingGuide = blogArticles.find((article) => article.slug === 'where-to-buy-commercial-bounce-houses-online');
const qualityGuide = blogArticles.find((article) => article.slug === 'what-defines-high-quality-commercial-inflatables');
if (!onlineBuyingGuide || !/where to buy bounce houses/i.test(onlineBuyingGuide.keywords)
  || !onlineBuyingGuide.faqs?.some((faq) => /auctions and liquidation/i.test(faq.question))) {
  failures.push('Commercial bounce-house sourcing guide is missing online-buying or auction intent');
}
if (!qualityGuide || !/high quality inflatables online/i.test(qualityGuide.keywords)
  || !qualityGuide.faqs?.some((faq) => /thicker PVC/i.test(faq.question))) {
  failures.push('Commercial inflatable quality guide is missing its online-buying or material-evaluation intent');
}
for (const article of [onlineBuyingGuide, qualityGuide].filter(Boolean)) {
  const copy = [article.title, article.description, article.intro, ...article.sections.map((section) => section.body), ...(article.faqs ?? []).flatMap((faq) => [faq.question, faq.answer])].join(' ');
  if (article.description.length > 158 || (article.metaTitle ?? article.title).length + ' | YIC'.length > 62) {
    failures.push('Blog ' + article.slug + ': title or description exceeds the site metadata limit');
  }
  if (/80%\s*to\s*150%|Plato\s+0\.55|24-hour inflation|frequently fail insurance inspections|rated for high wind loads/i.test(copy)) {
    failures.push('Blog ' + article.slug + ': contains an unverified price, brand, test, insurance, or load-rating claim');
  }
  if (!article.answer || !article.updated || !article.buyerFramework || !article.internalLinks?.length) {
    failures.push('Blog ' + article.slug + ': missing direct answer, revision date, buyer framework, or supporting links');
  }
}

const reportOpportunitySlugs = [
  'custom-shark-water-slide-design-guide',
  'water-walking-ball-vs-water-ball',
  'inflatable-manufacturers-in-usa-buyer-guide',
  'commercial-inflatable-playground-and-ball-pit-buying-guide',
  'commercial-christmas-inflatables-buying-guide',
  'donde-comprar-toboganes-inflables-comerciales',
];
for (const slug of reportOpportunitySlugs) {
  const article = blogArticles.find((item) => item.slug === slug);
  if (!article) {
    failures.push('Missing Semrush report opportunity article: ' + slug);
    continue;
  }
  if ((article.metaTitle ?? article.title).length + ' | YIC'.length > 62 || article.description.length > 158) {
    failures.push('Blog ' + slug + ': title or description exceeds the site metadata limit');
  }
  if (!article.answer || !article.updated || !article.buyerFramework || !article.internalLinks?.length || (article.faqs?.length ?? 0) < 4) {
    failures.push('Blog ' + slug + ': missing answer-first, updated, procurement framework, internal links, or FAQs');
  }
  if ((article.relatedProductSlugs ?? []).some((productSlug) => !products.some((product) => product.productSlug === productSlug))) {
    failures.push('Blog ' + slug + ': references an unknown catalog product');
  }
  if (article.imageProductSlug && !products.some((product) => product.productSlug === article.imageProductSlug)) {
    failures.push('Blog ' + slug + ': references an unknown article image product');
  }
  if ((article.internalLinks ?? []).some((link) => link.href.startsWith('/blog/') && !blogArticles.some((item) => link.href === '/blog/' + item.slug + '/'))) {
    failures.push('Blog ' + slug + ': contains a broken internal blog link');
  }
}
const spanishWaterSlideGuide = blogArticles.find((article) => article.slug === 'donde-comprar-toboganes-inflables-comerciales');
if (spanishWaterSlideGuide?.language !== 'es') failures.push('Spanish water-slide buyer guide is missing its Spanish document language');

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
