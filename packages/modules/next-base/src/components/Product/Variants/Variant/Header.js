import { isBlank } from '@foundation/lib/util';

import shopConfig from '@app/config/shop';

const hiddenVariantOptions = shopConfig.hiddenVariantOptions ?? [];

const ProductVariantHeader = ({ alias, name, basic, value, values = [] }) => {
  const optionName = !isBlank(basic?.name) ? basic.name : name;
  const currentValue = value?.label;

  if (hiddenVariantOptions.includes(alias) && values.length !== 1) {
    return null;
  } else {
    return (
      <div className="uk-text-small uk-margin-xsmall-bottom">
        <span className="uk-margin-xsmall-right">{optionName}</span>
        {currentValue && <span className="uk-text-muted">{currentValue}</span>}
      </div>
    );
  }
};

export default ProductVariantHeader;
