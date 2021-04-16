const ProductDescriptionHeader = () => (
  <header>
    <nav
      className="tm-product-nav"
      uk-sticky="offset: 60; bottom: #description; cls-active: tm-product-nav-fixed;"
    >
      <ul
        className="uk-subnav uk-subnav-pill js-product-switcher"
        uk-switcher="connect: .js-tabs"
      >
        <li>
          <a className="js-scroll-to-description" href="#description">
            Overview
          </a>
        </li>
        <li>
          <a className="js-scroll-to-description" href="#description">
            Specifications
          </a>
        </li>
        <li>
          <a className="js-scroll-to-description" href="#description">
            Accessories
            <span>(9)</span>
          </a>
        </li>
        <li>
          <a className="js-scroll-to-description" href="#description">
            Reviews
            <span>(2)</span>
          </a>
        </li>
        <li>
          <a className="js-scroll-to-description" href="#description">
            Q&A
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default ProductDescriptionHeader;
