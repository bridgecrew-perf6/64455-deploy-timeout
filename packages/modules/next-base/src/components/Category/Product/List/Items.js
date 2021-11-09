import { useRef } from 'react';

import {
  useDataTargetHref,
  useClickedItem,
  useClickedItemTracking,
} from '@foundation/next';

import { useProducts } from '@app/hooks/shop';

import ProductCard from '@shop/components/Product/Card';
import ProductListEmpty from '@shop/components/Category/Product/List/Empty';

const Hits = ({ hits, query }) => {
  const products = useProducts(hits);

  const loaded = query?.isFetched;

  if (products.length > 0) {
    return (
      <>
        {products.map(item => (
          <ProductCard key={item._key} id={item._key} item={item} />
        ))}
      </>
    );
  } else {
    return <ProductListEmpty loaded={loaded} />;
  }
};

const CategoryProductListItems = ({ query, hits = [], mode = 'grid' }) => {
  const ref = useRef(null);

  useClickedItemTracking('.tm-products > .tm-product-card', 'clickedProduct');

  useClickedItem(ref, 'clickedProduct', (element, scrollTop) => {
    if (scrollTop > 0) {
      requestAnimationFrame(() => {
        document.documentElement.scrollTop = scrollTop;
        document.body.scrollTop = scrollTop;
      });
    }
  });

  useDataTargetHref();

  return (
    <div>
      <div
        ref={ref}
        className={`uk-grid uk-grid-collapse uk-child-width-1-3 tm-products tm-products-overview tm-products-${mode}`}
        uk-grid="true"
      >
        <Hits query={query} hits={hits} />
      </div>
    </div>
  );
};

export default CategoryProductListItems;
