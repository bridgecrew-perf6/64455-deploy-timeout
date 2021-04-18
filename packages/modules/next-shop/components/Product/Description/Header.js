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
          <a href="#description" uk-scroll="duration: 300; offset: 58">
            Overview
          </a>
        </li>
        <li>
          <a href="#description" uk-scroll="duration: 300; offset: 58">
            Specifications
          </a>
        </li>
        <li>
          <a href="#description" uk-scroll="duration: 300; offset: 58">
            Accessories
            <span>(9)</span>
          </a>
        </li>
        <li>
          <a href="#description" uk-scroll="duration: 300; offset: 58">
            Reviews
            <span>(2)</span>
          </a>
        </li>
        <li>
          <a href="#description" uk-scroll="duration: 300; offset: 58">
            Q&A
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default ProductDescriptionHeader;
