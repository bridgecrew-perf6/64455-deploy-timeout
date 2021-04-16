import OffcanvasCartHeader from '@shop/components/Offcanvas/Cart/Header';
import OffcanvasCartItems from '@shop/components/Offcanvas/Cart/Items';
import OffcanvasCartFooter from '@shop/components/Offcanvas/Cart/Footer';

const OffcanvasCart = () => (
  <div id="cart-offcanvas" uk-offcanvas="overlay: true; flip: true">
    <aside className="uk-offcanvas-bar uk-padding-remove">
      <div className="uk-card uk-card-default uk-card-small uk-height-1-1 uk-flex uk-flex-column tm-shadow-remove">
        <OffcanvasCartHeader></OffcanvasCartHeader>
        <OffcanvasCartItems></OffcanvasCartItems>
        <OffcanvasCartFooter></OffcanvasCartFooter>
      </div>
    </aside>
  </div>
);

export default OffcanvasCart;
