require = require("esm")(module);

require('dotenv-flow').config();

const { configureSitemap } = require('@atelierfabien/nextjs-sitemap');
const i18n = require('../i18n');

const { default: getBlogPosts } = require('../slices/blog/lib/get-blog-posts');

async function getDynamicPaths() {
  const posts = await getBlogPosts();
  return posts.map((p) => `/blog/${p.slug}`);
}

getDynamicPaths().then((paths) => {
  const Sitemap = configureSitemap({
    baseUrl: process.env.SITE_URL ?? 'https://example.com',
    defaultLang: i18n.defaultLocale,
    langs: i18n.locales,
    isTrailingSlashRequired: true,
    targetDirectory: __dirname + '/../public',
    pagesDirectory: __dirname + '/../src/pages',
    include: paths,
    exclude: ['/404', '/500', '/blog/[slug]']
  });

  Sitemap.generateSitemap().then(() => {
    console.log('+ written sitemap.xml');
  });
});