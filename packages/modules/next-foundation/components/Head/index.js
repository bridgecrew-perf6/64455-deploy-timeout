import { useMemo } from 'react';
import Head from 'next/head';
import { useConfig, usePageOptions, useSeo, DefaultSeo } from '../../lib';

import HeadAssets from './Assets';

export default function AppHead({ children }) {
  const options = usePageOptions();
  const seo = useSeo(options.seo);

  const siteAssets = useConfig('site')('assets');

  const assets = useMemo(() => {
    const assets = [];

    if (Array.isArray(siteAssets)) {
      assets.push(...siteAssets);
    }

    if (Array.isArray(options.assets)) {
      assets.push(...options.assets);
    }

    return filterDuplicates(assets);
  }, [options.assets, siteAssets]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...seo} />
      <Head>
        {seo.openGraph.alternateLocales.map(lc => (
          <meta key={lc} property="og:locale:alternate" content={lc} />
        ))}
        {children}
      </Head>
      <HeadAssets assets={assets} />
    </>
  );
}

function filterDuplicates(assets) {
  const ids = [];

  return assets.filter(asset => {
    if (typeof asset._id === 'string') {
      if (ids.includes(asset._id)) return false;
      ids.push(asset._id);
    }
    return true;
  });
}
