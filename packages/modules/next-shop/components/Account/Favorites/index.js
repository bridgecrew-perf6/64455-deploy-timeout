import AccountContainer from '@shop/components/Account/Container';
import ProductCard from '@shop/components/Product/Card';

const AccountFavoritesPage = () => (
  <AccountContainer title="Favorites">
    <div className="uk-grid-collapse tm-products-list" uk-grid="true">
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </AccountContainer>
);

export default AccountFavoritesPage;
