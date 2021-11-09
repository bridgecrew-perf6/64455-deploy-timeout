import ProductInfoHeader from '@shop/components/Product/Info/Header';
import ProductVariants from '@shop/components/Product/Variants';
import ProductPurchase from '@shop/components/Product/Purchase';
import ProductInfoAvailability from '@shop/components/Product/Info/Availability';
import ProductInfoAccordion from '@shop/components/Product/Info/Accordion';

const ProductInfo = props => {
  return (
    <div className="uk-width-1-1 uk-width-2-5@m tm-product-info">
      <div className="uk-card-body">
        <ProductInfoHeader {...props} />
        <ProductVariants {...props} />
        <ProductPurchase {...props} />
        <ProductInfoAvailability {...props} />
        <ProductInfoAccordion {...props} />
      </div>
    </div>
  );
};

export default ProductInfo;
