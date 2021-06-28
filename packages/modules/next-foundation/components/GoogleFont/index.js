import React from 'react';
import Head from 'next/head';

// eslint-disable-next-line react/display-name
const GoogleFont = React.memo(({ href }) => {
  return (
    <Head>
      <link rel="stylesheet" href={href} />
    </Head>
  );
});

export default GoogleFont;
