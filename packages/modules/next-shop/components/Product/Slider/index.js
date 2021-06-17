import ProductCard from '@shop/components/Product/Card';

const ProductSlider = () => (
  <section>
    <div uk-slider="finite: true; clsVisible: tm-visible">
      <div
        className="uk-grid-small uk-flex-middle uk-margin-bottom"
        uk-grid="true"
      >
        <h2 className="uk-width-expand uk-text-center uk-text-left@s">
          Related Products
        </h2>
        <div className="uk-visible@s">
          <a
            className="tm-slidenav"
            href="#"
            uk-slider-item="previous"
            uk-slidenav-previous="true"
          />
          <a
            className="tm-slidenav"
            href="#"
            uk-slider-item="next"
            uk-slidenav-next="true"
          />
        </div>
      </div>
      <div>
        <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
          <div className="uk-position-relative">
            <div className="uk-slider-container">
              <div className="uk-slider-items uk-grid-collapse uk-child-width-1-3 uk-child-width-1-4@m tm-products-grid">
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
              </div>
            </div>
          </div>
        </div>
        <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin-top uk-hidden@s" />
      </div>
    </div>
  </section>
);

export default ProductSlider;
