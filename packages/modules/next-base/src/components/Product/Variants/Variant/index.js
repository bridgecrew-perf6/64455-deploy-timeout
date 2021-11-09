import { useMemo } from 'react';

import ProductVariantColor from '@shop/components/Product/Variants/Variant/Color';
import ProductVariantValue from '@shop/components/Product/Variants/Variant/Value';

const mapping = {
  color: ProductVariantColor,
};

const ProductVariant = props => {
  const { type } = props;
  const Component = useMemo(() => {
    return mapping[type] ?? ProductVariantValue;
  }, [type]);
  return <Component {...props} />;
};

export default ProductVariant;
