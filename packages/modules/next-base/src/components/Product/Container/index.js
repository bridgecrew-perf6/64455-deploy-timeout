import { wrapQuery } from '@foundation/next';

import Container from '@shop/components/Page/Container';

import ProductPage from '@shop/components/Product';
import ProductContainerJsonLd from '@shop/components/Product/Container/JsonLd';

import { withProduct, useVariantAsProduct } from '@app/hooks/shop';

import { getProductAvailability } from '@app/pages/api/rpc';

const delay = 1000;

const availabilityQuery = wrapQuery(id => {
  const start = new Date().getTime();
  return getProductAvailability(id).then(availability => {
    // For UX purposes, the fetching can be delayed,
    // which allows any loading indicators to show.
    const end = new Date().getTime();
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(availability);
      }, Math.max(end - start, delay));
    });
  });
});

const ProductContainer = ({ item, variant, ...props }) => {
  // Reduce the JSON-LD version to the current variant
  const metaItem = useVariantAsProduct(item, variant, true);

  return (
    <Container {...props} inheritFragments="all">
      <ProductPage item={item} variant={variant} {...props} />
      <ProductContainerJsonLd
        keyOverride={variant?._id}
        item={metaItem}
        variant={variant}
        {...props}
      />
    </Container>
  );
};

export default withProduct(ProductContainer, { availabilityQuery });
