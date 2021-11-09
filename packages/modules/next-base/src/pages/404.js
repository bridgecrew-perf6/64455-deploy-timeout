import { useEffect } from 'react';
import { useRouter } from '@foundation/next';

import Page from '@shop/components/Page';
import ErrorNotfound from '@shop/components/Error/Notfound';

const productVariantUrlRegex = /^\/shop\/products\/([^/]+)\/([^/]+)$/;

const Notfound = () => {
  const router = useRouter();

  // Redirect to master product page on the client
  useEffect(() => {
    if (productVariantUrlRegex.test(router.asPath)) {
      const productMasterUrl = router.asPath.split('/').slice(0, -1).join('/');
      setTimeout(() => router.replace(productMasterUrl), 1000);
    }
  }, [router]);

  return (
    <Page>
      <ErrorNotfound />
    </Page>
  );
};

Notfound.pageLayout = 'main';

Notfound.pageProps = {
  title: 'Not Found',
};

export default Notfound;
