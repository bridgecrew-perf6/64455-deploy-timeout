import { lookup } from '@foundation/lib/util';

import CommonLink from '@shop/components/Common/Link';

import config from '@app/config/shop';

const BrandName = ({ label }) => <>{label}</>;

const ProductInfoBrand = ({ item, linking = config.linkToBrand }) => {
  const label = lookup(item.brand, ['link', 'label'], ['title'], ['name']);

  return (
    <div className="tm-product-brand">
      {linking && (
        <CommonLink
          link={item.brand?.link}
          fallback={BrandName}
          fallbackLabel={label}
          className="uk-link-reset"
        />
      )}
      {!linking && <BrandName label={label} />}
    </div>
  );
};

export default ProductInfoBrand;
