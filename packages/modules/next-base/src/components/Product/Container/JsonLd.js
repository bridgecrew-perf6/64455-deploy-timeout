import { ProductJsonLd } from '@foundation/next';
import { get, blocksToText } from '@foundation/lib/util';

import { useProductOffers } from '@app/hooks/shop';
import { useImageWithPresets } from '@app/hooks/image';
import { getOpengraphImage } from '@app/lib/shop';

const ProductContainerJsonLd = ({ item, variant, variants }) => {
  const { getAttributeValue } = variants;

  const color = get(getAttributeValue('color'), 'label');
  const material = get(getAttributeValue('material'), 'label');

  const sourceImage = getOpengraphImage(item, variant);

  const images = useImageWithPresets(sourceImage, {
    presets: ['1:1', '4:3', '16:9'],
    scope: 'productJsonLd',
    urls: true,
  });

  const offers = useProductOffers(item);

  return (
    <ProductJsonLd
      sku={variant?.sku ?? item?.master?.sku ?? item?.alias}
      productName={item.name}
      description={blocksToText(item.description)}
      brand={item.brand?.name}
      manufacturerName={item.brand?.name}
      manufacturerLogo={
        item.brand?.logoUrl ? `${item.brand?.logoUrl}?w=480` : null
      }
      color={color}
      material={material}
      images={images}
      offers={offers}
    />
  );
};

export default ProductContainerJsonLd;
