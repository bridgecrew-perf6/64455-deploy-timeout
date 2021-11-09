import { localePaths } from '@foundation/next';
import { isBlank } from '@foundation/lib/util';

import { getClient } from '@atelierfabien/next-sanity/lib/server';

import {
  getClient as getBrowserClient,
  usePreviewQueryProps,
} from '@atelierfabien/next-sanity';

import ProductContainer from '@shop/components/Product/Container';

import init from '@app/sanity/types/product';

const products = init(getBrowserClient());

export const getStaticProps = async context => {
  const { params, preview = false } = context;
  const { alias } = params;

  const previewOptions = preview ? {} : undefined;

  const products = init(getClient(preview));

  const item = await products.getByAlias(
    alias,
    { locale: context.locale },
    previewOptions
  );

  if (item?._type === 'product') {
    const props = await products.resolveProps(item, { ...context });
    const page = props.currentPageProps;

    if (preview) {
      props.previewOptions = {
        studioUrl: `/desk/site;${item._type};${item._id}`,
        ...previewOptions,
        context,
      };
    }

    if (!isBlank(params.sku) && !page.skus.includes(params.sku)) {
      return { notFound: true };
    }

    return { props, revalidate: 60 };
  } else {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async ({ locales }) => ({
  paths: localePaths([], locales),
  fallback: 'blocking',
});

const prepareData = (item, _props, context) =>
  products.resolveProps(item, { ...context });

const Product = props => {
  const { page } = usePreviewQueryProps(props, { fn: prepareData });
  return <ProductContainer item={page} />;
};

export default Product;
