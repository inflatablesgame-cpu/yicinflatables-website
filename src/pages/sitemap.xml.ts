import { categories, products, company, productPath } from '../data/site';
import { blogArticles } from '../data/blog';

export function GET() {
  const pageSize = 16;
  const totalPages = Math.ceil(products.length / pageSize);
  const urls = [
    '/',
    '/products/',
    '/about/',
    '/contact/',
    '/blog/',
    '/faq/',
    '/privacy/',
    '/terms/',
    '/shipping/',
    ...blogArticles.map((article) => `/blog/${article.slug}/`),
    ...Array.from({ length: totalPages - 1 }, (_, index) => `/products/page/${index + 2}/`),
    ...categories.map((category) => `/products/${category.slug}/`),
    ...categories.flatMap((category) => {
      const categoryPageCount = Math.ceil(products.filter((product) => product.categorySlug === category.slug).length / pageSize);
      return Array.from({ length: categoryPageCount - 1 }, (_, index) => `/products/${category.slug}/page/${index + 2}/`);
    }),
    ...products.map((product) => productPath(product)),
  ];
  const body = urls
    .map((path) => `  <url><loc>${new URL(path, `https://${company.domain}`).href}</loc></url>`)
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
