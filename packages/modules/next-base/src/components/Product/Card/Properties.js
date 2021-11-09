import { useMemo } from 'react';

import { useTranslation } from '@foundation/next';

import { isBlank } from '@foundation/lib/util';

import { useProductProperties } from '@app/hooks/shop';

import { Text } from '@shop/components/Sanity';

import ProductCardColorDots from '@shop/components/Product/Card/ColorDots';
import ProductCardColorPills from '@shop/components/Product/Card/ColorPills';

const ProductCardProperties = ({ item }) => {
  const { t } = useTranslation();

  const properties = useProductProperties(
    attr => !(attr.hidden || attr.alias === 'availability')
  );

  const { color, colors, attributes = {} } = item;

  const entries = useMemo(() => {
    return properties.reduce((memo, property) => {
      const value = attributes[property.alias];
      if (!isBlank(value)) {
        const values = [].concat(value);
        memo.push({ ...property, values });
      }
      return memo;
    }, []);
  }, [attributes, properties]);

  return (
    <>
      <div className="tm-product-card-properties uk-text-small uk-flex-1">
        <Text
          content={item.blocks ?? item.text}
          className="tm-product-card-text uk-text-justify"
        />
        <ul className="uk-list">
          {item.brand?.name && (
            <li>
              <span className="uk-text-muted uk-margin-xsmall-right">
                {t('shop:brand')}
              </span>
              <span className="tm-value-listing">{item.brand?.name}</span>
            </li>
          )}
          {entries.map(attr => (
            <li key={attr.alias}>
              <span className="uk-text-muted uk-margin-xsmall-right">
                {getAttributeName(attr)}
              </span>
              <span className="tm-value-listing">
                {attr.values.map(value => (
                  <span key={value}>{value}</span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <ProductCardColorDots color={color} colors={colors} />
      <ProductCardColorPills color={color} colors={colors} />
    </>
  );
};

export default ProductCardProperties;

function getAttributeName(attr) {
  if (attr.values.length > 1) {
    return !isBlank(attr.basic?.pluralName)
      ? attr.basic.pluralName
      : attr.pluralName;
  } else {
    return !isBlank(attr.basic?.name) ? attr.basic.name : attr.name;
  }
}
