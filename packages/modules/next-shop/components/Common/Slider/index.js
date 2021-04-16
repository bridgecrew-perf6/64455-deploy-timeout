import { Link } from '@foundation/next';
import CommonSliderItem from '@shop/components/Common/Slider/Item';

const CommonSlider = () => (
  <section className="uk-section uk-section-default uk-section-small">
    <div className="uk-container">
      <h2 className="uk-text-center">Popular Brands</h2>
      <div className="uk-margin-medium-top" uk-slider="finite: true">
        <div className="uk-position-relative">
          <div className="uk-grid-small uk-flex-middle" uk-grid="true">
            <div className="uk-visible@m">
              <a
                href="#"
                uk-slidenav-previous="true"
                uk-slider-item="previous"
              />
            </div>
            <div className="uk-width-expand uk-slider-container">
              <ul className="uk-slider-items uk-child-width-1-3 uk-child-width-1-6@s uk-grid uk-grid-large">
                <CommonSliderItem />
                <CommonSliderItem />
                <CommonSliderItem />
                <CommonSliderItem />
                <CommonSliderItem />
                <CommonSliderItem />
                <CommonSliderItem />
                <CommonSliderItem />
                <CommonSliderItem />
                <CommonSliderItem />
                <CommonSliderItem />
                <CommonSliderItem />
              </ul>
            </div>
            <div className="uk-visible@m">
              <a href="#" uk-slider-item="next" uk-slidenav-next="true" />
            </div>
          </div>
        </div>
        <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin-medium-top uk-hidden@m" />
      </div>
      <div className="uk-margin uk-text-center">
        <Link
          className="uk-link-muted uk-text-uppercase tm-link-to-all"
          href="/brands"
        >
          <span>see all brands</span>
          <span uk-icon="icon: chevron-right; ratio: .75;" />
        </Link>
      </div>
    </div>
  </section>
);

export default CommonSlider;
