import { Link } from '@foundation/next';

import { lookupImageSettings } from '@app/hooks/image';

import ProductCardImage from '@shop/components/Product/Card/Image';
import ProductCardColorDots from '@shop/components/Product/Card/ColorDots';

const { defaultPlaceholder } = lookupImageSettings('productCard');

const ProductCardMedia = props => {
  const { item, url } = props;
  const { color, colors, image = defaultPlaceholder } = item;
  return (
    <div className="tm-product-card-media">
      <Link className="tm-media-box" href={url}>
        <ProductCardImage image={image} {...props} />
        <ProductCardColorDots color={color} colors={colors} />
      </Link>
    </div>
  );
};

export default ProductCardMedia;
