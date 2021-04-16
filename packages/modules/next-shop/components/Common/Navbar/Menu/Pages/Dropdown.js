import { Link } from '@foundation/next';

const CommonNavbarMenuPagesDropdown = () => (
  <div
    className="uk-navbar-dropdown uk-margin-remove uk-padding-remove-vertical"
    uk-drop="pos: bottom-justify;delay-show: 125;delay-hide: 50;duration: 75;boundary: .tm-navbar-container;boundary-align: true;pos: bottom-justify;flip: x"
  >
    <div className="uk-container uk-container-small uk-margin-top uk-margin-bottom">
      <ul className="uk-nav uk-nav-default uk-column-1-3">
        <li>
          <Link href="/catalog">Catalog</Link>
        </li>
        <li>
          <Link href="/category">Category</Link>
        </li>
        <li>
          <Link href="/subcategory">Subcategory</Link>
        </li>
        <li>
          <Link href="/product">Product</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>
        </li>
        <li>
          <Link href="/checkout">Checkout</Link>
        </li>
        <li>
          <Link href="/compare">Compare</Link>
        </li>
        <li>
          <Link href="/brands">Brands</Link>
        </li>
        <li>
          <Link href="/compare">Compare</Link>
        </li>
        <li>
          <Link href="/account">Account</Link>
        </li>
        <li>
          <Link href="/favorites">Favorites</Link>
        </li>
        <li>
          <Link href="/account/profile">Personal</Link>
        </li>
        <li>
          <Link href="/account/settings">Settings</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contacts">Contacts</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/news">News</Link>
        </li>
        <li>
          <Link href="/article">Article</Link>
        </li>
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
        <li>
          <Link href="/delivery">Delivery</Link>
        </li>
        <li>
          <Link href="/404">404</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default CommonNavbarMenuPagesDropdown;
