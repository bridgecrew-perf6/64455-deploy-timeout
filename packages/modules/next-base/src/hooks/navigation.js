import { useCallback, useMemo } from 'react';
import { Link, useRouter } from '@foundation/next';
import {
  get,
  lookup,
  joinUrl,
  isBlank,
  mergeObjects,
  isEmpty,
} from '@foundation/lib/util';

import { buildProductUrl, buildCategoryUrl } from '@app/lib/navigation';

import NavbarDropdown from '@app/components/Common/Navbar/Menu/Item/Dropdown';
import NavbarDropbar from '@app/components/Common/Navbar/Menu/Item/Dropbar';

import localizedNavigation from '@app/config/navigation';

const typeMapping = {
  default: NavbarDropdown,
  dropbar: NavbarDropbar,
};

const linkMapping = new Map();

linkMapping.set('default', item => {
  const label = lookup(item, ['label'], ['name'], ['title']);
  return { label };
});

linkMapping.set('link', item => {
  const href = lookup(item, ['external'], ['internal', 'path']);
  return { ...item, href };
});

linkMapping.set('cta', item => {
  const href = lookup(item, ['external'], ['internal', 'path']);
  return { ...item, href };
});

linkMapping.set('page', item => {
  const label = lookup(item, ['content', 'label'], ['content', 'title']);
  const alias = lookup(item, ['alias']);
  const href = alias ? joinUrl('/pages', alias) : null;
  return { ...item, label, href };
});

linkMapping.set('file', item => {
  const title = lookup(
    item,
    ['asset', 'filename'],
    ['asset', 'originalFilename']
  );
  const label = lookup(item, 'label') ?? title;
  const href = lookup(item, ['asset', 'url']);
  const mimeType = lookup(item, ['asset', 'mimeType']);
  const [_badge, badge] = mimeType ? mimeType.split('/') : ['file'];
  return { ...item, label, title, href, mimeType, badge };
});

linkMapping.set('product', item => ({
  ...item,
  href: buildProductUrl(item),
}));

linkMapping.set('product.category', item => ({
  ...item,
  href: buildCategoryUrl(item),
}));

export const buildLink = (link = {}, type) => {
  const { _type } = link;

  const defaultCallback = linkMapping.get('default');

  let callback;
  if (typeof type === 'string' && linkMapping.has(type)) {
    callback = linkMapping.get(type);
  } else if (typeof _type === 'string' && linkMapping.has(_type)) {
    callback = linkMapping.get(_type);
  } else {
    callback = typeof type === 'function' ? type : item => item;
  }

  const { label, href, internal, external, newWindow, ...data } = mergeObjects(
    defaultCallback(link),
    callback(link)
  );

  const props = { linkType: _type ?? type };

  props.label = label ?? get(internal, ['label']);
  props.validLabel = !isBlank(props.label);
  if (!props.validLabel) props.label = 'Link';

  props.href = external ?? href ?? lookup(link, ['path'], ['asset', 'url']);
  props.valid = !isBlank(props.href);
  if (!props.valid) props.href = '#';

  props.newWindow = Boolean(newWindow || external);
  props.target = props.newWindow ? '_blank' : null;

  const _key = lookup(link, '_key', '_id') ?? props.href ?? props.label;

  return { _key, ...link, ...data, ...props };
};

export const useLink = (link, type) =>
  useMemo(() => buildLink(link, type), [link, type]);

export const useNavigation = name => {
  const { locale, defaultLocale } = useRouter();
  return useMemo(() => {
    const navigation = get(
      localizedNavigation,
      [locale, name],
      get(localizedNavigation, [defaultLocale, name], null)
    );
    const nodes = navigation?.nodes ?? [];
    return [navigation, nodes];
  }, [locale, defaultLocale, name]);
};

export const useNavigationNode = (node = {}, filter) => {
  const {
    type,
    parent,
    label,
    href,
    target,
    newWindow,
    item,
    level = 0,
    levels = 1,
    ...data
  } = useLink(node, 'navigation.node');

  const options = { levels, ...parent?.options, ...node.options };

  const nodes = useMemo(() => {
    const children =
      Array.isArray(node.nodes) && !isEmpty(node.nodes)
        ? node.nodes
        : Array.isArray(item?.nodes)
        ? item.nodes
        : [];
    return typeof filter === 'function' ? children.filter(filter) : children;
  }, [filter, item, node.nodes]);

  const recursive =
    nodes.length > 0 && options.levels > 0 && level <= options.levels;

  const buildDropdown = useCallback(() => {
    const Dropdown = typeMapping[type] ?? NavbarDropdown;
    return recursive ? (
      <Dropdown levels={levels} level={level + 1} parent={node} nodes={nodes} />
    ) : null;
  }, [level, levels, node, nodes, recursive, type]);

  return {
    ...data,
    label,
    href,
    target,
    newWindow,
    options,
    buildDropdown,
    recursive,
    nodes: recursive ? nodes : [],
  };
};

export const NavigationItem = props => {
  const { label, href, partial, target, options } = useNavigationNode({
    levels: 0,
    ...props,
  });

  return (
    <Link
      as="li"
      href={href}
      partial={partial}
      target={target}
      className={options.className}
    >
      {label}
    </Link>
  );
};

export const useBreadcrumbs = (items = [], options = {}) => {
  const { type, prependItems = [] } = options;
  return useMemo(() => {
    const breadcrumbs = []
      .concat(prependItems, items ?? [])
      .map(item => buildLink(item, type));
    const current = breadcrumbs.pop(breadcrumbs);
    return [breadcrumbs, current ?? null];
  }, [items, prependItems, type]);
};
