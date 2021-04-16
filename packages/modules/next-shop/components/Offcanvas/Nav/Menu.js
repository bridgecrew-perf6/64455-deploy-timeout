import { Link } from '@foundation/next';

const OffcanvasNavMenu = () => (
  <nav className="uk-card-small uk-card-body">
    <ul
      className="uk-nav-default uk-nav-parent-icon uk-list-divider"
      uk-nav="true"
    >
      <li className="uk-parent">
        <Link href="/catalog">Catalog</Link>
        <ul className="uk-nav-sub uk-list-divider">
          <li>
            <Link href="/subcategory">Laptops & Tablets</Link>
          </li>
          <li>
            <Link href="/subcategory">Phones & Gadgets</Link>
          </li>
          <li>
            <Link href="/subcategory">TV & Video</Link>
          </li>
          <li>
            <Link href="/subcategory">Games & Entertainment</Link>
          </li>
          <li>
            <Link href="/subcategory">Photo</Link>
          </li>
          <li className="uk-text-center">
            <Link
              className="uk-link-muted uk-text-uppercase tm-link-to-all"
              href="/catalog"
            >
              <span>see all categories</span>
              <span uk-icon="icon: chevron-right; ratio: .75;" />
            </Link>
          </li>
        </ul>
      </li>
      <li className="uk-parent">
        <Link href="/brands">Brands</Link>
        <ul className="uk-nav-sub uk-list-divider">
          <li>
            <Link href="/subcategory">Apple</Link>
          </li>
          <li>
            <Link href="/subcategory">Samsung</Link>
          </li>
          <li>
            <Link href="/subcategory">Sony</Link>
          </li>
          <li>
            <Link href="/subcategory">Microsoft</Link>
          </li>
          <li>
            <Link href="/subcategory">Intel</Link>
          </li>
          <li>
            <Link href="/subcategory">HP</Link>
          </li>
          <li>
            <Link href="/subcategory">LG</Link>
          </li>
          <li>
            <Link href="/subcategory">Lenovo</Link>
          </li>
          <li>
            <Link href="/subcategory">ASUS</Link>
          </li>
          <li>
            <Link href="/subcategory">Acer</Link>
          </li>
          <li>
            <Link href="/subcategory">Dell</Link>
          </li>
          <li>
            <Link href="/subcategory">Canon</Link>
          </li>
          <li className="uk-text-center">
            <Link
              className="uk-link-muted uk-text-uppercase tm-link-to-all"
              href="/brands"
            >
              <span>see all brands</span>
              <span uk-icon="icon: chevron-right; ratio: .75;" />
            </Link>
          </li>
        </ul>
      </li>
      <li className="uk-parent">
        <a href="#">Pages</a>
        <ul className="uk-nav-sub uk-list-divider">
          <li>
            <Link href="/subcategory">Catalog</Link>
          </li>
          <li>
            <Link href="/subcategory">Category</Link>
          </li>
          <li>
            <Link href="/subcategory">Subcategory</Link>
          </li>
          <li>
            <Link href="/subcategory">Product</Link>
          </li>
          <li>
            <Link href="/subcategory">Cart</Link>
          </li>
          <li>
            <Link href="/subcategory">Checkout</Link>
          </li>
          <li>
            <Link href="/subcategory">Compare</Link>
          </li>
          <li>
            <Link href="/subcategory">Brands</Link>
          </li>
          <li>
            <Link href="/subcategory">Compare</Link>
          </li>
          <li>
            <Link href="/subcategory">Account</Link>
          </li>
          <li>
            <Link href="/subcategory">Favorites</Link>
          </li>
          <li>
            <Link href="/subcategory">Personal</Link>
          </li>
          <li>
            <Link href="/subcategory">Settings</Link>
          </li>
          <li>
            <Link href="/subcategory">About</Link>
          </li>
          <li>
            <Link href="/subcategory">Contacts</Link>
          </li>
          <li>
            <Link href="/subcategory">Blog</Link>
          </li>
          <li>
            <Link href="/subcategory">News</Link>
          </li>
          <li>
            <Link href="/subcategory">Article</Link>
          </li>
          <li>
            <Link href="/subcategory">FAQ</Link>
          </li>
          <li>
            <Link href="/subcategory">Delivery</Link>
          </li>
          <li>
            <Link href="/subcategory">404</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/contacts">Contacts</Link>
      </li>
      <li>
        <Link href="/compare">
          Compare<span className="uk-badge uk-margin-xsmall-left">3</span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default OffcanvasNavMenu;
