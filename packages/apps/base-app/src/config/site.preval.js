import preval from 'next-plugin-preval';
import config from '../../next-seo.config';

const name = process.env.SITE_NAME ?? 'example';
const baseUrl =
  process.env.SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://example.com');

const DEFAULTS = {
  name,
  baseUrl,
  openGraph: {
    type: 'website',
    url: baseUrl,
    site_name: name,
    images: [{ url: `${baseUrl}/og-image.png` }],
  },
  ...config,
};

async function getData() {
  return DEFAULTS;
}

export default preval(getData());
