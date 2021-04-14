import Head from 'next/head';
import { useSeo, DefaultSeo } from '../../lib';

export default function AppHead({ children }) {
  const seo = useSeo();

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
    </>
  );
}
