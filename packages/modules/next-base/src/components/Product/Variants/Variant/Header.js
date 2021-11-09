import { isBlank } from '@foundation/lib/util';

const ProductVariantHeader = ({ name, basic, value }) => {
  const optionName = !isBlank(basic?.name) ? basic.name : name;
  const currentValue = value?.label;
  return (
    <div className="uk-text-small uk-margin-xsmall-bottom">
      <span className="uk-margin-xsmall-right">{optionName}</span>
      {currentValue && <span className="uk-text-muted">{currentValue}</span>}
    </div>
  );
};

export default ProductVariantHeader;
