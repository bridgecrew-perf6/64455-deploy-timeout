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

export const getStaticProps = async context => {
  const { params, preview = false } = context;
  const [alias] = params?.path || [];

  const previewOptions = preview ? {} : undefined;

  const pages = init(getClient(preview));

  const item = await pages.getByAlias(
    alias,
    { locale: context.locale },
    previewOptions
  );

  if (item?._type === 'page') {
    const props = await pages.resolveProps(item, { ...context });
    if (preview) {
      props.previewOptions = {
        studioUrl: `/desk/site;${item._type};${item._id}`,
        ...previewOptions,
        context,
      };
    }
    return { props };
  } else {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async context => {
  const paths = await pages.getStaticPaths(context, doc => {
    return homepageId !== doc._id;
  });

  return { paths, fallback: false };
};

const prepareData = (item, _props, context) =>
  pages.resolveProps(item, { ...context });

const PageContainer = props => {
  const pageProps = usePreviewQueryProps(props, { fn: prepareData });
  return <Container {...pageProps} />;
};

export default PageContainer;
