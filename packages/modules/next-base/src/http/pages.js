import { getClient } from '@atelierfabien/next-sanity/lib/server';

import {
  getClient as getBrowserClient,
  usePreviewQueryProps,
} from '@atelierfabien/next-sanity';

import Container from '@shop/components/Page/Container';

import init from '@app/sanity/types/page';

import config from '@app/config/app';

const homepageId = config?.homepage?.page;

const pages = init(getBrowserClient());

export const getPagePropsByAlias = async (alias, options = {}) => {
  const { preview = false } = options;

  const previewOptions = preview ? {} : undefined;

  const pages = init(getClient(preview));

  const item = await pages.getByAlias(
    alias,
    { locale: options.locale },
    previewOptions
  );

  if (item?._type === 'page') {
    const props = await pages.resolveProps(item, { ...options });
    if (preview) {
      props.previewOptions = {
        studioUrl: `/desk/site;${item._type};${item._id}`,
        ...previewOptions,
        options,
      };
    }
    return { props };
  } else {
    return {
      notFound: true,
    };
  }
};

export const getStaticProps = async context => {
  const path = context.params?.path;
  return getPagePropsByAlias(Array.isArray(path) ? path[0] : path, context);
};

export const getServerSideProps = async context => {
  const path = context.params?.path;
  return getPagePropsByAlias(Array.isArray(path) ? path[0] : path, context);
};

export const getStaticPaths = async context => {
  const paths = await pages.getStaticPaths(context, doc => {
    return homepageId !== doc._id;
  });

  return { paths, fallback: false };
};

export const prepareData = (item, _props, context) => {
  return pages.resolveProps(item, { ...context });
};

export const Page = props => {
  const pageProps = usePreviewQueryProps(props, { fn: prepareData });
  return <Container {...pageProps} />;
};
