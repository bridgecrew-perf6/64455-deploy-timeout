import { useRef } from 'react';
import { withPortal } from '@foundation/next';

import OffcanvasNavHeader from '@shop/components/Offcanvas/Nav/Header';
import OffcanvasNavMenu from '@shop/components/Offcanvas/Nav/Menu';
import OffcanvasNavToolbar from '@shop/components/Offcanvas/Nav/Toolbar';
import OffcanvasNavSocial from '@shop/components/Offcanvas/Nav/Social';

const OffcanvasNav = withPortal(() => {
  const ref = useRef();

  function onClick(e) {
    if (
      ref.current &&
      e.target.matches('a') &&
      !e.target.matches('.uk-parent > a')
    ) {
      setTimeout(() => UIkit.offcanvas(ref.current).hide(), 300);
    }
  }

  return (
    <div
      id="nav-offcanvas"
      ref={ref}
      onClick={onClick}
      uk-offcanvas="overlay: true; container: #__next"
    >
      <aside className="uk-offcanvas-bar uk-padding-remove tm-offcanvas-bar">
        <div className="uk-card uk-card-default uk-card-small uk-padding-remove-top tm-shadow-remove uk-flex uk-flex-column uk-height-1-1">
          <div className="uk-flex-1">
            <OffcanvasNavHeader></OffcanvasNavHeader>
            <OffcanvasNavMenu></OffcanvasNavMenu>
            <OffcanvasNavToolbar></OffcanvasNavToolbar>
          </div>
          <OffcanvasNavSocial></OffcanvasNavSocial>
        </div>
      </aside>
    </div>
  );
});

export default OffcanvasNav;
