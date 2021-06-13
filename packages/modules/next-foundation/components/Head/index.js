import Head from 'next/head';
import { usePageOptions, useSeo, DefaultSeo } from '../../lib';

import HeadAssets from './Assets';

export default function AppHead({ children }) {
  const options = usePageOptions();
  const seo = useSeo(options.seo);
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
      <HeadAssets assets={options.assets} />
    </>
  );
}
