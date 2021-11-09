import { buildSitemap } from '@app/sanity/server/sitemap';

const maxAge = 3600 * 6; // 6 hours

export default async (req, res) => {
  const sitemap = await buildSitemap();

  // Set headers
  res.setHeader('Content-Type', 'text/xml');

  res.setHeader(
    'Cache-Control',
    `max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate`
  );

  // Write the sitemap context to resonse
  res.write(sitemap);

  // End response
  res.end();
};
