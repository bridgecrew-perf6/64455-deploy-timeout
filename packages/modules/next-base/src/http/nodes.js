/* eslint-disable prettier/prettier */

import { get, trim } from '@atelierfabien/next-foundation/lib/util';

import { getClient } from '@atelierfabien/next-sanity/lib/server';

import {
  getClient as getBrowserClient,
  usePreviewQueryProps,
} from '@atelierfabien/next-sanity';

import init from '@app/sanity/types/node';

import Container from '@shop/components/Page/Container';

import config from '@app/config/app';

import { defaultLocale } from '@root/i18n';

const nodes = init(getBrowserClient());

const homepageId = config?.homepage?.page;

export const getPagePropsByPath = async (path, options = {}) => {
  const { preview = false } = options;
  const segments = [].concat(
    Array.isArray(path) ? path : trim(path.split('/'), '/')
  );

  const nodes = init(getClient(preview));

  const node = await nodes.getByPath(segments, {
    locale: options.locale,
  });

  if (node && node.item?._type === 'page') {
    const props = await nodes.resolveProps(node.item, {
      ...options,
      node,
    });
    if (preview) {
      props.previewOptions = {
        studioUrl: `/desk/site;${node.item._type};${node.item._id}`,
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

export const getStaticProps = async (context) => {
  return getPagePropsByPath(context.params?.path, context);
};

export const getServerSideProps = async (context) => {
  return getPagePropsByPath(context.params?.path, context);
};

export const getStaticPaths = async (context) => {
  const nodes = init(getClient());
  const paths = await nodes.getStaticPaths(context, (doc) => {
    const path = get(doc, ['i18n', defaultLocale, 'path']);
    return doc.item?._ref !== homepageId && path !== '/';
  });
  return { paths, fallback: false };
};

export const prepareData = (node, _props, context) => {
  return nodes.resolveProps(node.item, { ...context, node });
};

export const Page = (props) => {
  const pageProps = usePreviewQueryProps(props, { fn: prepareData });
  return <Container {...pageProps} />;
};
