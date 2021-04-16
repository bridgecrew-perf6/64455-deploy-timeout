import ProductCard from '@shop/components/Product/Card';

const FavoritesPage = () => (
  <div className="uk-grid-collapse tm-products-list" uk-grid="true">
    <ProductCard />
    <ProductCard />
    <ProductCard />
  </div>
);

export default FavoritesPage;
