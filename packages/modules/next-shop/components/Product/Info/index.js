import ProductInfoBrand from '@shop/components/Product/Info/Brand';
import ProductInfoDetails from '@shop/components/Product/Info/Details';
import ProductVariants from '@shop/components/Product/Variants';
import ProductPurchase from '@shop/components/Product/Purchase';
import ProductInfoDelivery from '@shop/components/Product/Info/Delivery';
import ProductInfoProperties from '@shop/components/Product/Info/Properties';

const ProductInfo = () => (
  <div className="uk-width-1-1 uk-width-1-3@m tm-product-info">
    <div className="uk-card-body">
      {/* Brand */}
      <ProductInfoBrand></ProductInfoBrand>
      {/* Rating & Statuses */}
      <ProductInfoDetails></ProductInfoDetails>
      {/* Variations */}
      <ProductVariants></ProductVariants>
      {/* Shop */}
      <ProductPurchase></ProductPurchase>
      {/* Delivery info */}
      <ProductInfoDelivery></ProductInfoDelivery>
      {/* Properties */}
      <ProductInfoProperties></ProductInfoProperties>
    </div>
  </div>
);

export default ProductInfo;
