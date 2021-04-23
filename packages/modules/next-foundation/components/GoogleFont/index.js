import React from 'react';
import Head from 'next/head';

const GoogleFont = React.memo(({ href }) => {
  return (
    <Head>
      <link
        key="fonts.gstatic.com"
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link rel="preload" as="style" href={href} />
      <link rel="stylesheet" href={href} />
    </Head>
  );
});

export default GoogleFont;
