import { get } from '@atelierfabien/next-foundation/lib/util';
import { getClient } from '@atelierfabien/next-sanity/lib/server';

import {
  getClient as getBrowserClient,
  usePreviewQueryProps,
} from '@atelierfabien/next-sanity';

import Container from '@shop/components/Page/Container';

import init from '@app/sanity/types/node';

import config from '@app/config/app';

import { defaultLocale } from '@root/i18n';

const nodes = init(getBrowserClient());

const homepageId = config?.homepage?.page;

export const getStaticProps = async (context) => {
  const { params, preview = false } = context;
  const segments = [].concat(params?.path ?? []);

  const nodes = init(getClient(preview));

  const node = await nodes.getByPath(segments, { locale: context.locale });

  if (node && node.item?._type === 'page') {
    const props = await nodes.resolveProps(node.item, { ...context, node });
    if (preview) {
      props.previewOptions = {
        studioUrl: `/desk/site;${node.item._type};${node.item._id}`,
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

export const getStaticPaths = async (context) => {
  const nodes = init(getClient());
  const paths = await nodes.getStaticPaths(context, (doc) => {
    const path = get(doc, ['i18n', defaultLocale, 'path']);
    return doc.item?._ref !== homepageId && path !== '/';
  });
  return { paths, fallback: false };
};

const prepareData = (node, _props, context) =>
  nodes.resolveProps(node.item, { ...context, node });

const PageContainer = (props) => {
  const pageProps = usePreviewQueryProps(props, { fn: prepareData });
  return <Container {...pageProps} />;
};

export default PageContainer;
