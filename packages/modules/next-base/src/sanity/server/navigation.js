import {
  getClient,
  tree,
  processResults,
} from '@atelierfabien/next-sanity/lib/server';

import { locales, defaultLocale } from '@root/i18n';

import { navigationProjection } from '@app/sanity/queries';

const localizedNavigation = locales
  .reduce((memo, locale) => {
    const lc = JSON.stringify(locale);
    memo.push(`${lc}: *[_type == 'settings.site'][0]{
      ${navigationProjection.replace(/\$locale/g, lc)}
    }`);
    return memo;
  }, [])
  .join(', ');

export const fetchNavigation = async () => {
  const data = await getClient(true).fetch(`{ ${localizedNavigation} }`, {
    defaultLocale,
  });
  return processResults(data ?? {});
};

export const processNavigation = (
  navigation,
  lookup,
  baseParents = [],
  omitParent = false
) => {
  lookup = lookup instanceof Map ? lookup : new Map();
  const parents = new Set();
  tree.treeWalkDeep(
    navigation ?? {},
    (node, index, siblings, parent, level) => {
      if (level <= 1) parents.clear();
      if (parent && parent._type !== 'navigation' && !omitParent) {
        parents.add(parent);
      }
      const ancestors = baseParents.concat([...parents]);
      node.ancestors = ancestors.map(i => i._id);
      if (node._id) lookup.set(node._id, node);
      if (typeof node.item === 'object' && node.item) {
        const omit =
          node._type === 'navigation.node' &&
          node.item._type === 'product.category';

        processNavigation(node.item, lookup, ancestors.concat(node), omit);
      }
    },
    'nodes'
  );
  return lookup;
};
