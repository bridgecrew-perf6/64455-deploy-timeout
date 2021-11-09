import { useCurrency } from '@foundation/next';

const ProductPurchaseTags = ({ item, className }) => {
  const c = useCurrency();

  const visible = item.pricing?.suggested > 0 || item.pricing?.discount > 0;

  if (visible) {
    return (
      <div className={className}>
        {item.pricing?.suggested > 0 && (
          <del className="tm-product-price-suggested uk-label uk-label-muted uk-margin-xsmall-left uk-visible@s">
            {c.format(item.pricing?.suggested)}
          </del>
        )}
        {item.pricing?.discount > 0 && (
          <span className="tm-product-price-discount uk-label uk-label-danger uk-margin-xsmall-left">
            -{item.pricing?.discount}%
          </span>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default ProductPurchaseTags;
