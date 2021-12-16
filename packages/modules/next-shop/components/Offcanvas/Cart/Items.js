import OffcanvasCartItem from '@shop/components/Offcanvas/Cart/Item';

const OffcanvasCartItems = () => (
  <div className="uk-card-body uk-overflow-auto">
    <ul className="uk-list uk-list-divider">
      <li className="uk-visible-toggle">
        <OffcanvasCartItem />
      </li>
      <li className="uk-visible-toggle">
        <OffcanvasCartItem />
      </li>
    </ul>
  </div>
);

export default OffcanvasCartItems;
