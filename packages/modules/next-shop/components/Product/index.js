import ProductDetails from '@shop/components/Product/Details';
import ProductSlider from '@shop/components/Product/Slider';

const ProductPage = () => (
  <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
    {/* Product */}
    <ProductDetails></ProductDetails>
    {/* Related items */}
    <ProductSlider></ProductSlider>
  </div>
);

export default ProductPage;
