import { define, defineQuery } from '@atelierfabien/next-sanity';
import groq from 'groq';

import { getPageProps } from '@foundation/next';
import {
  pick,
  isBlank,
  lookup,
  segmentize,
  mergeObjects,
} from '@foundation/lib/util';

import { buildCategoryUrl } from '@app/lib/navigation';

import {
  buildRootCategory,
  nodeToCategory,
  buildCategoryTitle,
  prepareBreadcrumbs,
  buildCategorySeo,
} from '@app/lib/shop';

import { getPageLayout, getPageType } from '@app/lib/page';

import {
  coreProperties,
  categoryDetailsProjection,
  buildNodeProjection,
  nodesProjection,
  categoryPredicate,
  categoryProjection,
} from '@app/sanity/queries';

import initNode from '@app/sanity/types/node';

import { defaultLocale } from '@root/i18n';

export const predicate = categoryPredicate;

export const projection = categoryProjection;

const options = { predicate, projection, defaultLocale, i18n: true };

const routePath = '/shop/categories';

export async function resolveProps(item = {}, context = {}) {
  const { node, locales, router = {} } = context;

  const breadcrumbs = prepareBreadcrumbs(item);

  const props = pick(item, coreProperties);

  props.title = buildCategoryTitle(item);
  props.description = item.description ?? '';

  const canonicalPath = '/shop';

  // Page layout, mapped to site layout component
  const pageLayout = getPageLayout(item, 'shop');

  // Page type, mapped to page component
  const pageType = getPageType(item, 'basic');

  // // Use page sections, or fall back to layout sections
  // const sections = lookup(item, ['sections'], ['layout', 'sections']);

  // // Use page assets, or fall back to layout assets
  // const assets = lookup(item, ['assets'], ['layout', 'assets']);

  // // Use navigation reference from page, or fallback to layout reference
  // const navigation = getPageNavigation(item);

  // // Lookup social media image
  // const openGraphImage = getOpengraphImage(item) ?? null;

  const localizedUrls = locales.reduce((memo, locale) => {
    const path = lookup(node, ['i18n', locale, 'path']);
    if (!isBlank(path)) memo[locale] = buildCategoryUrl({ path });
    return memo;
  }, {});

  return getPageProps(context, {
    page: {
      ...props,
      category: item,
      node,
    },
    heading: {
      breadcrumbs,
    },
    seo: mergeObjects(node?.seo, item?.seo, buildCategorySeo(item)),
    router: {
      path: canonicalPath,
      locales: localizedUrls,
      ...router,
    },
    pageLayout,
    pageType,
  });
}

// Note, this needs to be a normal function, not an arrow fn

async function fetchCategoryAndNodeByPath(path, options = {}) {
  const segments = [].concat(
    typeof path === 'string' ? segmentize(path) : path ?? []
  );
  const { locale } = options;

  let node;
  let category;

  const root = buildRootCategory(locale);

  node = await this.getNodeByPath(routePath, segments, { locale });

  category = await this.getByPath(segments, {
    projection: categoryDetailsProjection,
    locale,
  });

  if (!category && node && node.item?._type === 'product.category') {
    category = node.item;
  } else {
    category = category || nodeToCategory(node ?? root);
  }

  if (category && segments.length > 0 && Array(category.parents)) {
    category.parents.unshift(nodeToCategory(root));
  }

  category.children = category.children ?? [];

  if (segments.length > 1) {
    category.parent = await this.getByPath(segments.slice(0, -1), {
      projection: categoryDetailsProjection,
      locale,
    });
  }

  return [category, node];
}

// Methods

const get = defineQuery('id', options);

const getByPath = defineQuery('path', { ...options, i18n: false });

const fetch = defineQuery('all', options);

const fetchCategoryAndNode = defineQuery(fetchCategoryAndNodeByPath);

const getStaticPaths = defineQuery('staticPaths', {
  ...options,
  projection: groq`_id, _type, path`,
});

export default define(
  {
    get,
    getByPath,
    fetch,
    fetchCategoryAndNode,
    getStaticPaths,
    resolveProps,
  },
  handler => {
    handler.node = handler.node ?? initNode(handler.client);
    handler.getNodeByPath = (routePath, path, options = {}) =>
      handler.node.getByPath(path, {
        ...options,
        routePath,
        predicate: `route->path.current == $routePath`,
        projection: buildNodeProjection(
          categoryDetailsProjection,
          `'nodes': ${nodesProjection}`
        ),
      });
  }
);
