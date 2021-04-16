import { Link } from '@foundation/next';

const CommonNavbarMenuCatalogDropdown = () => (
  <div
    className="uk-navbar-dropdown uk-margin-remove uk-padding-remove-vertical"
    uk-drop="pos: bottom-justify;delay-show: 125;delay-hide: 50;duration: 75;boundary: .tm-navbar-container;boundary-align: true;pos: bottom-justify;flip: x"
  >
    <div className="uk-container">
      <ul className="uk-navbar-dropdown-grid uk-child-width-1-5" uk-grid="true">
        <li>
          <div className="uk-margin-top uk-margin-bottom">
            <Link className="uk-link-reset" href="/category">
              <img
                className="uk-display-block uk-margin-auto uk-margin-bottom"
                src="/images/catalog/computers.svg"
                alt="Laptops & Tablets"
                width={80}
                height={80}
              />
              <div className="uk-text-bolder">Laptops & Tablets</div>
            </Link>
            <ul className="uk-nav uk-nav-default">
              <li>
                <Link href="/subcategory">Laptops</Link>
              </li>
              <li>
                <Link href="/subcategory">Tablets</Link>
              </li>
              <li>
                <Link href="/subcategory">Peripherals</Link>
              </li>
              <li>
                <Link href="/subcategory">Keyboards</Link>
              </li>
              <li>
                <Link href="/subcategory">Accessories</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="uk-margin-top uk-margin-bottom">
            <Link className="uk-link-reset" href="/category">
              <img
                className="uk-display-block uk-margin-auto uk-margin-bottom"
                src="/images/catalog/phones.svg"
                alt="Phones & Gadgets"
                width={80}
                height={80}
              />
              <div className="uk-text-bolder">Phones & Gadgets</div>
            </Link>
            <ul className="uk-nav uk-nav-default">
              <li>
                <Link href="/subcategory">Smartphones</Link>
              </li>
              <li>
                <Link href="/subcategory">Mobile Phones</Link>
              </li>
              <li>
                <Link href="/subcategory">Smart watches</Link>
              </li>
              <li>
                <Link href="/subcategory">Charging and batteries</Link>
              </li>
              <li>
                <Link href="/subcategory">Accessories</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="uk-margin-top uk-margin-bottom">
            <Link className="uk-link-reset" href="/category">
              <img
                className="uk-display-block uk-margin-auto uk-margin-bottom"
                src="/images/catalog/tv.svg"
                alt="TV & Video"
                width={80}
                height={80}
              />
              <div className="uk-text-bolder">TV & Video</div>
            </Link>
            <ul className="uk-nav uk-nav-default">
              <li>
                <Link href="/subcategory">TV</Link>
              </li>
              <li>
                <Link href="/subcategory">Home Cinema</Link>
              </li>
              <li>
                <Link href="/subcategory">Satellite & Cable TV</Link>
              </li>
              <li>
                <Link href="/subcategory">Projectors</Link>
              </li>
              <li>
                <Link href="/subcategory">DVD & Blu-ray</Link>
              </li>
              <li>
                <Link href="/subcategory">Accessories</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="uk-margin-top uk-margin-bottom">
            <Link className="uk-link-reset" href="/category">
              <img
                className="uk-display-block uk-margin-auto uk-margin-bottom"
                src="/images/catalog/games.svg"
                alt="Games & Entertainment"
                width={80}
                height={80}
              />
              <div className="uk-text-bolder">Games & Entertainment</div>
            </Link>
            <ul className="uk-nav uk-nav-default">
              <li>
                <Link href="/subcategory">Gaming consoles</Link>
              </li>
              <li>
                <Link href="/subcategory">Games</Link>
              </li>
              <li>
                <Link href="/subcategory">Software</Link>
              </li>
              <li>
                <Link href="/subcategory">Joysticks & gamepads</Link>
              </li>
              <li>
                <Link href="/subcategory">Accessories</Link>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className="uk-margin-top uk-margin-bottom">
            <Link className="uk-link-reset" href="/category">
              <img
                className="uk-display-block uk-margin-auto uk-margin-bottom"
                src="/images/catalog/photo.svg"
                alt="Photo"
                width={80}
                height={80}
              />
              <div className="uk-text-bolder">Photo</div>
            </Link>
            <ul className="uk-nav uk-nav-default">
              <li>
                <Link href="/subcategory">Cameras</Link>
              </li>
              <li>
                <Link href="/subcategory">Lenses</Link>
              </li>
              <li>
                <Link href="/subcategory">Accessories</Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

export default CommonNavbarMenuCatalogDropdown;
