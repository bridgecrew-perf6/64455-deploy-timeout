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
          <Link href="/subcategory" as="li">
            Laptops & Tablets
          </Link>
          <Link href="/subcategory" as="li">
            Phones & Gadgets
          </Link>
          <Link href="/subcategory" as="li">
            TV & Video
          </Link>
          <Link href="/subcategory" as="li">
            Games & Entertainment
          </Link>
          <Link href="/subcategory" as="li">
            Photo
          </Link>
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
          <Link href="/subcategory" as="li">
            Apple
          </Link>
          <Link href="/subcategory" as="li">
            Samsung
          </Link>
          <Link href="/subcategory" as="li">
            Sony
          </Link>
          <Link href="/subcategory" as="li">
            Microsoft
          </Link>
          <Link href="/subcategory" as="li">
            Intel
          </Link>
          <Link href="/subcategory" as="li">
            HP
          </Link>
          <Link href="/subcategory" as="li">
            LG
          </Link>
          <Link href="/subcategory" as="li">
            Lenovo
          </Link>
          <Link href="/subcategory" as="li">
            ASUS
          </Link>
          <Link href="/subcategory" as="li">
            Acer
          </Link>
          <Link href="/subcategory" as="li">
            Dell
          </Link>
          <Link href="/subcategory" as="li">
            Canon
          </Link>
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
          <Link href="/brands" as="li">
            Brands
          </Link>
          <Link href="/compare" as="li">
            Compare
          </Link>
          <Link href="/account" as="li">
            Account
          </Link>
          <Link href="/account/favorites" as="li">
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
      </li>
      <Link href="/blog" as="li">
        Blog
      </Link>
      <Link href="/about" as="li">
        About
      </Link>
      <Link href="/contacts" as="li">
        Contacts
      </Link>
      <Link href="/compare" as="li">
        Compare<span className="uk-badge uk-margin-xsmall-left">3</span>
      </Link>
    </ul>
  </nav>
);

export default OffcanvasNavMenu;
