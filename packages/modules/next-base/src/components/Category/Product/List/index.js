import { useMemo } from 'react';
import { usePage, useQuery, useRouter } from '@foundation/next';

import ProductCategoryListSettings from '@shop/components/Category/Product/List/Settings';
import ProductCategoryListItems from '@shop/components/Category/Product/List/Items';

import { useUserPreference } from '@app/hooks/preferences';

const modes = ['grid', 'list'];

const CategoryProductList = () => {
  const [mode, updateMode] = useUserPreference('listViewMode', modes, 'grid');

  const { locale, query: params } = useRouter();
  const { category } = usePage();

  const path = (category?.node ? '' : category?.path) ?? '';

  let url = `/api/products/list${path}?locale=${locale}`;

  if (params.query) url += `&term=${encodeURIComponent(params.query)}`;

  const query = useQuery(
    ['products', path, locale, params.query ?? ''],
    () => fetch(url).then((response) => response.json()),
    {
      keepPreviousData: true,
      staleTime: 60 * 1000,
    }
  );

  const hits = useMemo(
    () => (Array.isArray(query.data) ? query.data : []),
    [query.data]
  );

  return (
    <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
      {/* Items */}
      <div>
        <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
          <div className="uk-grid-collapse uk-child-width-1-1" uk-grid="true">
            {/* Settings */}
            <ProductCategoryListSettings
              query={query}
              hits={hits}
              mode={mode}
              setMode={updateMode}
            />
            {/* Items */}
            <ProductCategoryListItems query={query} hits={hits} mode={mode} />
            {/* Pagination */}
            <div className="uk-line-height uk-padding-small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductList;
