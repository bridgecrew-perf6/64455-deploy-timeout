require('dotenv-flow').config();

const { configureSitemap } = require('@atelierfabien/nextjs-sitemap');
const { i18n = {} } = require('../next.config');

const Sitemap = configureSitemap({
  baseUrl: process.env.SITE_URL ?? 'https://example.com',
  defaultLang: i18n.defaultLocale,
  langs: i18n.locales,
  isTrailingSlashRequired: true,
  targetDirectory: __dirname + '/../public',
  pagesDirectory: __dirname + '/../src/pages',
});

Sitemap.generateSitemap().then(() => {
  console.log('+ written sitemap.xml');
});