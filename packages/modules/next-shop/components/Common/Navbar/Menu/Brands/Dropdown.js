import { Link } from '@foundation/next';

const CommonNavbarMenuBrandsDropdown = () => (
  <div
    className="uk-navbar-dropdown uk-margin-remove uk-padding-remove-vertical"
    uk-drop="pos: bottom-justify;delay-show: 125;delay-hide: 50;duration: 75;boundary: .tm-navbar-container;boundary-align: true;pos: bottom-justify;flip: x"
  >
    <div className="uk-container uk-container-small uk-margin-top uk-margin-bottom">
      <ul className="uk-grid-small uk-child-width-1-6" uk-grid="true">
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="Apple"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/apple.svg" alt="Apple" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="Samsung"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/samsung.svg" alt="Samsung" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="Sony"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/sony.svg" alt="Sony" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="Microsoft"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/microsoft.svg" alt="Microsoft" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="Intel"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/intel.svg" alt="Intel" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="HP"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/hp.svg" alt="HP" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="LG"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/lg.svg" alt="LG" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="Lenovo"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/lenovo.svg" alt="Lenovo" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="ASUS"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/asus.svg" alt="ASUS" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="Acer"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/acer.svg" alt="Acer" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="Dell"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/dell.svg" alt="Dell" />
              </figure>
            </a>
          </div>
        </li>
        <li>
          <div className="tm-ratio tm-ratio-4-3">
            <a
              className="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large tm-media-box"
              href="#"
              title="Canon"
            >
              <figure className="tm-media-box-wrap">
                <img src="/images/brands/canon.svg" alt="Canon" />
              </figure>
            </a>
          </div>
        </li>
      </ul>
      <div className="uk-text-center uk-margin">
        <Link
          className="uk-link-muted uk-text-uppercase tm-link-to-all"
          href="/brands"
        >
          <span>See all brands</span>
          <span uk-icon="icon: chevron-right; ratio: .75;" />
        </Link>
      </div>
    </div>
  </div>
);

export default CommonNavbarMenuBrandsDropdown;
