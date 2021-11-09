import Head from 'next/head';

import { useConfig } from '@foundation/next';

const SnipcartHead = () => {
  const config = useConfig('shop')('snipcart');
  const cssUrl = `https://cdn.snipcart.com/themes/v${config.version}/default/snipcart.css`;
  const scriptUrl = `https://cdn.snipcart.com/themes/v${config.version}/default/snipcart.js`;

  return (
    <Head>
      <link rel="preconnect" href="https://app.snipcart.com" />
      <link rel="preconnect" href="https://cdn.snipcart.com" />
      <link rel="stylesheet" href={cssUrl} />
      <script async src={scriptUrl} />
    </Head>
  );
};

export default SnipcartHead;
