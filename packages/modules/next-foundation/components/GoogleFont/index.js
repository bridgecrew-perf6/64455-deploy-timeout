import React from 'react';
import Head from 'next/head';

const GoogleFont = React.memo(({ href }) => {
  return (
    <Head>
      <link rel="stylesheet" href={href} />
    </Head>
  );
});

export default GoogleFont;
