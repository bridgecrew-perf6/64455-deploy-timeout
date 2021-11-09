import { useTranslation } from '@foundation/next';

import ProductInfoProperties from '@shop/components/Product/Info/Properties';
import ProductInfoDescription from '@shop/components/Product/Info/Description';
import ProductInfoVariants from '@shop/components/Product/Info/Variants';

const ProductInfoAccordion = props => {
  const hasVariants = props?.variants?.hasVariants;

  const { t } = useTranslation();

  return (
    <div className="uk-margin">
      <ul uk-accordion="true">
        <li className="uk-open">
          <a className="uk-accordion-title" href="#">
            {t('shop:productDescription')}
          </a>
          <div className="uk-accordion-content">
            <ProductInfoDescription {...props} />
          </div>
        </li>
        <li>
          <a className="uk-accordion-title" href="#">
            {t('shop:productDetails')}
          </a>
          <div className="uk-accordion-content">
            <ProductInfoProperties {...props} />
          </div>
        </li>
        {hasVariants && (
          <li>
            <a className="uk-accordion-title" href="#">
              {t('shop:productVariants')}
            </a>
            <div className="uk-accordion-content">
              <ProductInfoVariants {...props} />
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProductInfoAccordion;
