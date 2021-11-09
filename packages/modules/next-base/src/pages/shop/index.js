import { getClient } from '@atelierfabien/next-sanity';

import { pick } from '@foundation/lib/util';

import Container from '@shop/components/Category/Container';

import init from '@app/sanity/types';

const client = init(getClient());

const MAX_AGE = 86400; // Cache in CDN for a day

export const getServerSideProps = async (context) => {
  const { res } = context;

  const searchState = pick(context.query ?? {}, ['page']);

  const [category, node] = await client.category.fetchCategoryAndNode(
    context.params?.path,
    context
  );

  if (category) {
    const props = await client.category.resolveProps(category, {
      ...context,
      node,
    });

    props.initialSearchState = searchState;

    res.setHeader(
      'Cache-Control',
      `max-age=${MAX_AGE}, s-maxage=${MAX_AGE}, stale-while-revalidate`
    );

    return { props };
  } else {
    return { notFound: true };
  }
};

export default Container;
