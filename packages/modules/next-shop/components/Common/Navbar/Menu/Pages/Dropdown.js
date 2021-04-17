import { Link } from '@foundation/next';

const CommonNavbarMenuPagesDropdown = () => (
  <div
    className="uk-navbar-dropdown uk-margin-remove uk-padding-remove-vertical"
    uk-drop="pos: bottom-justify;delay-show: 125;delay-hide: 50;duration: 75;boundary: .tm-navbar-container;boundary-align: true;pos: bottom-justify;flip: x"
  >
    <div className="uk-container uk-container-small uk-margin-top uk-margin-bottom">
      <ul className="uk-nav uk-nav-default uk-column-1-3">
        <Link href="/catalog" as="li">
          Catalog
        </Link>
        <Link href="/category" as="li">
          Category
        </Link>
        <Link href="/subcategory" as="li">
          Subcategory
        </Link>
        <Link href="/product" as="li">
          Product
        </Link>
        <Link href="/cart" as="li">
          Cart
        </Link>
        <Link href="/checkout" as="li">
          Checkout
        </Link>
        <Link href="/compare" as="li">
          Compare
        </Link>
        <Link href="/brands" as="li">
          Brands
        </Link>
        <Link href="/compare" as="li">
          Compare
        </Link>
        <Link href="/account" as="li">
          Account
        </Link>
        <Link href="/favorites" as="li">
          Favorites
        </Link>
        <Link href="/account/profile" as="li">
          Personal
        </Link>
        <Link href="/account/settings" as="li">
          Settings
        </Link>
        <Link href="/about" as="li">
          About
        </Link>
        <Link href="/contacts" as="li">
          Contacts
        </Link>
        <Link href="/blog" as="li">
          Blog
        </Link>
        <Link href="/news" as="li">
          News
        </Link>
        <Link href="/article" as="li">
          Article
        </Link>
        <Link href="/faq" as="li">
          FAQ
        </Link>
        <Link href="/delivery" as="li">
          Delivery
        </Link>
        <Link href="/404" as="li">
          404
        </Link>
      </ul>
    </div>
  </div>
);

export default CommonNavbarMenuPagesDropdown;
