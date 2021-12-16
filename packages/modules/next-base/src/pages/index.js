import { useRouter, useQuery, wrapQuery } from '@foundation/next';

import { getClient } from '@atelierfabien/next-sanity/lib/server';

import {
  getClient as getBrowserClient,
  usePreviewQueryProps,
} from '@atelierfabien/next-sanity';

import CommonBanner from '@shop/components/Common/Banner';
import Container from '@shop/components/Page/Container';

import init from '@app/sanity/types/page';

import config from '@app/config/app';
import { getHomepage } from '@app/pages/api/rpc';

const homepageId = config?.homepage?.page;

const _query = wrapQuery(getHomepage, true);

const pages = init(getBrowserClient());

export const getStaticProps = async context => {
  const { preview = false } = context;

  const previewOptions = preview ? {} : undefined;

  const pages = init(getClient(preview));

  const item = await pages.get(
    homepageId,
    { locale: context.locale },
    previewOptions
  );

  if (item?._type === 'page') {
    const props = await pages.resolveProps(item, {
      ...context,
      router: { path: '/' },
    });

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

const prepareData = (item, _props, context) =>
  pages.resolveProps(item, { ...context });

const Index = props => {
  const { locale } = useRouter();

  const pageProps = usePreviewQueryProps(props, { fn: prepareData });

  const query = useQuery(['homepage', locale], _query, {
    staleTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true,
  });

  const banner = query?.data?.banner;

  return (
    <>
      {banner && <CommonBanner banner={banner} />}
      <Container {...pageProps} />
    </>
  );
};

export default Index;
