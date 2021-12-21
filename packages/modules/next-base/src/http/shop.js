import { getClient } from '@atelierfabien/next-sanity';

import { pick } from '@foundation/lib/util';

import Container from '@shop/components/Category/Container';

import init from '@app/sanity/types';

const client = init(getClient());

export const getServerSideProps = async context => {
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

    return { props };
  } else {
    return { notFound: true };
  }
};

export const Shop = Container;
