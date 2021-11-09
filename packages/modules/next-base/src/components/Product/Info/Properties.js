import { useMemo, useCallback } from 'react';
import { useTranslation } from '@foundation/next';
import { isBlank } from '@foundation/lib/util';

import CommonLink from '@shop/components/Common/Link';

const PropertyAttribute = ({ attribute, value, onClick }) => {
  if (value.isVariant) {
    return (
      <a
        onClick={onClick}
        data-property={attribute.alias}
        data-value={value._id}
        className="uk-link-reset"
      >
        {value.label}
      </a>
    );
  } else {
    return <span>{value.label}</span>;
  }
};

const ProductInfoProperties = ({ item, variant, variants }) => {
  const { t } = useTranslation();

  const { master, attributes, currentSelection, setVariant, setProperty } =
    variants;

  // Check for Sanity Document: options.hidden = true

  const visibleAttributes = useMemo(() => {
    return attributes.filter(
      attr => !(attr.hidden || attr.alias === 'availability')
    );
  }, [attributes]);

  const identifiers = useMemo(() => {
    const items = [];
    if (master.sku !== variant.sku) {
      items.push(master);
    }
    return items.concat(variant);
  }, [master, variant]);

  const toggleVariant = useCallback(
    e => {
      e.preventDefault();
      const sku = e.currentTarget?.dataset?.sku;
      setVariant(variant.sku === sku ? '' : sku);
    },
    [setVariant, variant.sku]
  );

  const toggleProperty = useCallback(
    e => {
      e.preventDefault();
      const property = e.currentTarget?.dataset?.property;
      const value = e.currentTarget?.dataset?.value;
      if (!isBlank(property) && !isBlank(value)) {
        if (currentSelection[property] === value) {
          setProperty(property);
        } else {
          setProperty(property, value);
        }
      }
    },
    [currentSelection, setProperty]
  );

  return (
    <div className="uk-margin tm-product-details">
      <ul className="uk-list uk-text-small uk-margin-remove">
        {/* SKU */}
        <li className="uk-text-truncate">
          <span className="uk-text-muted uk-margin-xsmall-right">SKU</span>
          <span className="tm-value-listing">
            {identifiers.map(identifier => (
              <CommonLink
                key={identifier.sku}
                href={identifier.href}
                onClick={toggleVariant}
                data-sku={identifier.sku}
                className="uk-link-reset"
                suppressHydrationWarning
              >
                {identifier.sku}
              </CommonLink>
            ))}
          </span>
        </li>
        {/* Attributes */}
        {visibleAttributes.map(attr => (
          <li key={attr.alias}>
            <span className="uk-text-muted uk-margin-xsmall-right">
              {getAttributeName(attr)}
            </span>
            <span className="tm-value-listing">
              {attr.values.map(value => (
                <PropertyAttribute
                  key={value._id}
                  attribute={attr}
                  value={value}
                  onClick={toggleProperty}
                />
              ))}
            </span>
          </li>
        ))}
        {/* Categories */}
        <li className="uk-text-truncate">
          <span className="uk-text-muted uk-margin-xsmall-right">
            {t(
              item.categories.length > 1
                ? 'shop:productCategories'
                : 'shop:productCategory'
            )}
          </span>
          <span className="tm-value-listing">
            {item.categories.map(category => (
              <CommonLink
                key={category._id}
                link={category}
                className="uk-link-reset"
              />
            ))}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ProductInfoProperties;

function getAttributeName(attr) {
  if (attr.values.length > 1) {
    return !isBlank(attr.basic?.pluralName)
      ? attr.basic.pluralName
      : attr.pluralName;
  } else {
    return !isBlank(attr.basic?.name) ? attr.basic.name : attr.name;
  }
}
