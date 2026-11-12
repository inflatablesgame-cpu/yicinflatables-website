import { categories, products, categoryPath, company, productPath } from '../data/site';
import { blogArticles } from '../data/blog';
import { caseStudyCards } from '../data/case-studies';

export function GET() {
  const urls = [
    '/',
    '/products/',
    '/about/',
    '/factory-evidence/',
    '/case-studies/',
    '/contact/',
    '/blog/',
    '/inflatable-bounce-house-guide/',
    '/faq/',
    '/privacy/',
    '/terms/',
    '/shipping/',
    ...caseStudyCards.map((caseStudy) => `/case-studies/${caseStudy.id}/`),
    ...blogArticles.map((article) => `/blog/${article.slug}/`),
    ...categories.map((category) => categoryPath(category)),
    ...products.map((product) => productPath(product)),
  ];
  const body = urls
    // Do not claim every URL changed on every request. Search engines use
    // lastmod as a freshness signal, so an inaccurate date weakens the sitemap.
    .map((path) => `  <url><loc>${new URL(path, `https://${company.domain}`).href}</loc></url>`)
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
