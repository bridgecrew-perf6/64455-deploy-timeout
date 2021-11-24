// eslint-disable-next-line no-global-assign
require = require('esm')(module);

require('dotenv-flow').config();

const fs = require('fs');
const path = require('path');

const baseUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://example.com');

const robots = `User-agent: *
Disallow: /shop/categories
Disallow: /nl/shop/categories
Disallow: /shop/categories/*
Disallow: /nl/shop/categories/*
Allow: *

Sitemap: SITE_URL/sitemap.xml`;

async function writeRobotsTxt(baseUrl) {
  const formatted = robots.replace(/SITE_URL/g, baseUrl);
  const filepath = path.join(path.cwd(), 'public', 'robots.txt');
  return fs.promises.writeFile(filepath, formatted, 'utf8');
}

writeRobotsTxt(baseUrl);
