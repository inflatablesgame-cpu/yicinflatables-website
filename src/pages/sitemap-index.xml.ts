export const prerender = true;

/** The site publishes one canonical sitemap. Prevent the legacy index URL
 * from falling through to the HTML homepage with a misleading 200 response.
 */
export function GET() {
  return new Response(null, {
    status: 301,
    headers: { location: '/sitemap.xml', 'cache-control': 'public, max-age=3600' },
  });
}
