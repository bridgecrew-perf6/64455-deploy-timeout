import ProductVariantHeader from '@shop/components/Product/Variants/Variant/Header';
import ProductVariantItem from '@shop/components/Product/Variants/Variant/Item';

const ProductVariantValue = props => {
  const { type, values, setValue } = props;
  if (Array.isArray(values) && values.length > 0) {
    return (
      <div className={`tm-variations-${type}`}>
        <ProductVariantHeader {...props} />
        {values.length > 1 && (
          <div className="uk-grid uk-grid-xsmall tm-variations" uk-grid="true">
            {values.map(value => (
              <ProductVariantItem
                key={value._id}
                type={type}
                value={value}
                onClick={setValue}
              >
                {value.label}
              </ProductVariantItem>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default ProductVariantValue;
