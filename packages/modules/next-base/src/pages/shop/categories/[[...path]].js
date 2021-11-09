import { getClient } from '@atelierfabien/next-sanity';

import Container from '@shop/components/Category/Container';

import init from '@app/sanity/types';

const client = init(getClient());

const routePath = '/shop/categories';

export const getStaticProps = async context => {
  const [category, node] = await client.category.fetchCategoryAndNode(
    context.params?.path,
    context
  );

  const props = await client.category.resolveProps(category, {
    ...context,
    node,
  });

  return {
    props,
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

export const getStaticPaths = async context => {
  const categories = await client.category.getStaticPaths(context);

  const nodes = await client.node.getStaticPaths({
    ...context,
    routePath,
    predicate: `route->path.current == $routePath`,
  });

  return { paths: categories.concat(nodes), fallback: false };
};

export default Container;
