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
              <Link href="/subcategory" as="li">
                Laptops
              </Link>
              <Link href="/subcategory" as="li">
                Tablets
              </Link>
              <Link href="/subcategory" as="li">
                Peripherals
              </Link>
              <Link href="/subcategory" as="li">
                Keyboards
              </Link>
              <Link href="/subcategory" as="li">
                Accessories
              </Link>
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
              <Link href="/subcategory" as="li">
                Smartphones
              </Link>
              <Link href="/subcategory" as="li">
                Mobile Phones
              </Link>
              <Link href="/subcategory" as="li">
                Smart watches
              </Link>
              <Link href="/subcategory" as="li">
                Charging and batteries
              </Link>
              <Link href="/subcategory" as="li">
                Accessories
              </Link>
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
              <Link href="/subcategory" as="li">
                TV
              </Link>
              <Link href="/subcategory" as="li">
                Home Cinema
              </Link>
              <Link href="/subcategory" as="li">
                Satellite & Cable TV
              </Link>
              <Link href="/subcategory" as="li">
                Projectors
              </Link>
              <Link href="/subcategory" as="li">
                DVD & Blu-ray
              </Link>
              <Link href="/subcategory" as="li">
                Accessories
              </Link>
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
              <Link href="/subcategory" as="li">
                Gaming consoles
              </Link>
              <Link href="/subcategory" as="li">
                Games
              </Link>
              <Link href="/subcategory" as="li">
                Software
              </Link>
              <Link href="/subcategory" as="li">
                Joysticks & gamepads
              </Link>
              <Link href="/subcategory" as="li">
                Accessories
              </Link>
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
              <Link href="/subcategory" as="li">
                Cameras
              </Link>
              <Link href="/subcategory" as="li">
                Lenses
              </Link>
              <Link href="/subcategory" as="li">
                Accessories
              </Link>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

export default CommonNavbarMenuCatalogDropdown;
