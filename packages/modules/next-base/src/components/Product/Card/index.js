import { useProductUrl } from '@app/hooks';

import ProductCardMedia from '@shop/components/Product/Card/Media';
import ProductCardBody from '@shop/components/Product/Card/Body';

import config from '@app/config/shop';

const ProductCard = props => {
  const { item = {}, ...options } = props;
  const url = useProductUrl(item, config.linkToVariant ? item.variant : null);

  return (
    <article
      data-id={item._id}
      className="tm-product-card"
      data-target-href={url}
    >
      {/* Media */}
      <ProductCardMedia item={item} url={url} {...options} />
      {/* Body */}
      <ProductCardBody item={item} url={url} {...options} />
    </article>
  );
};

export default ProductCard;
