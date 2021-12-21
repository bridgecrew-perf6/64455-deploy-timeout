import { getClient } from '@atelierfabien/next-sanity';

import Container from '@shop/components/Category/Container';

import init from '@app/sanity/types';

import shopConfig from '@app/config/shop';

const revalidate = shopConfig.revalidation?.category ?? 60;

const client = init(getClient());

const routePath = '/shop/categories';

export const getCategoryPropsByPath = async (
  path,
  context,
  serverSide = false
) => {
  const [category, node] = await client.category.fetchCategoryAndNode(
    path,
    context
  );

  const props = await client.category.resolveProps(category, {
    ...context,
    node,
  });

  return revalidate > 0 && !serverSide ? { props, revalidate } : { props };
};

export const getStaticProps = async context => {
  const path = context.params?.path;
  return getCategoryPropsByPath(path, context);
};

export const getServerSideProps = async context => {
  const path = context.params?.path;
  return getCategoryPropsByPath(path, context, true);
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

export const Categories = Container;
