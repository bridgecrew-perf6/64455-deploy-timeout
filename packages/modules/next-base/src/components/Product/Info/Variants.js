import { useMemo, useCallback } from 'react';
import { Link } from '@foundation/next';

import { buildAttributesString } from '@app/lib/shop';

const className =
  'uk-display-block uk-width-1-1 uk-text-center uk-text-truncate uk-label uk-label-small uk-label-secondary uk-label-transparent';

const ProductInfoVariants = ({ variant, variants }) => {
  const { all, setVariant, properties } = variants;

  const orderedVariants = useMemo(() => {
    return all.map(v => {
      return { ...v, label: buildAttributesString(v) };
    });
  }, [all]);

  const toggleVariant = useCallback(
    e => {
      e.preventDefault();
      const sku = e.currentTarget?.dataset?.sku;
      setVariant(variant.sku === sku ? '' : sku);
    },
    [setVariant, variant.sku]
  );

  const [baseColumns, columns] =
    properties.length === 1 ? [3, 4] : properties.length > 2 ? [2, 2] : [2, 3];

  return (
    <div className="uk-margin">
      <div
        className={`uk-grid uk-grid-small uk-child-width-1-${baseColumns} uk-child-width-1-${columns}@s`}
        uk-grid="true"
      >
        {orderedVariants.map(v => (
          <div key={v._id}>
            <div className={v.active ? 'uk-active' : ''}>
              <Link
                href={v.href}
                onClick={toggleVariant}
                className={className}
                data-sku={v.sku}
              >
                {v.label}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfoVariants;
