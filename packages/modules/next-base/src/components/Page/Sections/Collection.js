import { useMemo } from 'react';

import components from '@shop/components/Page/Components';

import colors from '@shop/config/colors';

import { useRouter, useQuery, wrapQuery, isBlank } from '@foundation/next';

import { getCollection } from '@app/lib/rpc';

const query = wrapQuery(getCollection);

const noop = data => () => data;

const Wrapper = ({ children }) => <>{children}</>;

const CollectionSection = section => {
  const {
    _type,
    component,
    style,
    nested,
    collection = {},
    options = {},
    live = false,
    className = '',
  } = section;

  const color = colors.includes(section?.color) ? section.color : 'none';

  let sectionClass =
    !nested && style !== 'framed'
      ? 'tm-expand'
      : color !== 'none'
      ? 'tm-frame'
      : 'tm-none';

  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';
  if (color !== 'none' && style !== 'wide') sectionClass += ' uk-padding';

  const foreground =
    color === 'none'
      ? ''
      : color === 'muted' || color === 'default'
      ? 'uk-dark'
      : 'uk-light';

  const componentName = component ?? collection.component;

  const Component = useMemo(() => {
    return components[componentName] ?? components.CollectionSection ?? Wrapper;
  }, [componentName]);

  const { locale } = useRouter();

  const performQuery = live || !isBlank(collection?.query?.filter);
  const queryOptions = options?.queryOptions ?? {};
  const limit = typeof queryOptions.limit === 'number' ? queryOptions.limit : 0;

  const initialData =
    Array.isArray(collection.items) && collection.items.length > 0
      ? collection
      : undefined;

  const result = useQuery(
    [collection._id, locale, queryOptions],
    performQuery ? query : noop(collection),
    {
      staleTime: 60 * 1000,
      keepPreviousData: true,
      ...options.fetchOptions,
      initialData,
    }
  );

  let items = Array.isArray(result?.data?.items) ? result.data.items : [];
  if (limit > 0) items = items.slice(0, limit);

  return (
    <section
      className={`tm-section uk-section-${color} ${foreground} ${className} ${sectionClass}`}
      data-section={_type}
      data-collection={collection?.alias?.current}
    >
      <Component
        item={section}
        items={items}
        result={result}
        collection={result?.data ?? {}}
        componentName={componentName}
        options={options}
      />
    </section>
  );
};

export default CollectionSection;
