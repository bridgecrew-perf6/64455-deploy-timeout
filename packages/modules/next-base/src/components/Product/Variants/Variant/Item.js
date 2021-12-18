import { useCallback } from 'react';
import { Link } from '@foundation/next';

const ProductVariantItem = ({ children, type, value, onClick }) => {
  const handler = useCallback(
    e => onClick(value._id, e, true),
    [onClick, value._id]
  );

  return (
    <div>
      <div className={value.className}>
        <Link
          href={value?.variant?.href}
          onClick={handler}
          className={`tm-pill tm-variation-${type}`}
          suppressHydrationWarning
        >
          {children ?? '\u00a0'}
        </Link>
      </div>
    </div>
  );
};

export default ProductVariantItem;
