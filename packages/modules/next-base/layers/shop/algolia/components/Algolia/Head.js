import Head from 'next/head';

const AlgoliaHead = ({ theme = false }) => {
  if (theme) {
    return (
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
          integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc="
          crossOrigin="anonymous"
        />
      </Head>
    );
  } else {
    return null;
  }
};

export default AlgoliaHead;
