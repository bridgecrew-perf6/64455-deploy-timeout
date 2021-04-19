import { useRef } from 'react';
import { withPortal } from '@foundation/next';

import OffcanvasCartHeader from '@shop/components/Offcanvas/Cart/Header';
import OffcanvasCartItems from '@shop/components/Offcanvas/Cart/Items';
import OffcanvasCartFooter from '@shop/components/Offcanvas/Cart/Footer';

const OffcanvasCart = withPortal(() => {
  const ref = useRef();

  function onClick(e) {
    if (ref.current && !e.target.matches('.uk-parent > a')) {
      setTimeout(() => UIkit.offcanvas(ref.current).hide(), 300);
    }
  }

  return (
    <div
      id="cart-offcanvas"
      ref={ref}
      onClick={onClick}
      uk-offcanvas="overlay: true; flip: true; container: #__next"
    >
      <aside className="uk-offcanvas-bar uk-padding-remove">
        <div className="uk-card uk-card-default uk-card-small uk-height-1-1 uk-flex uk-flex-column tm-shadow-remove">
          <OffcanvasCartHeader></OffcanvasCartHeader>
          <OffcanvasCartItems></OffcanvasCartItems>
          <OffcanvasCartFooter></OffcanvasCartFooter>
        </div>
      </aside>
    </div>
  );
});

export default OffcanvasCart;
