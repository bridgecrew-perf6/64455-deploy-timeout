import CommonSlideshowItem from '@shop/components/Common/Slideshow/Item';

const CommonSlideshow = () => (
  <section
    className="uk-position-relative uk-visible-toggle uk-light"
    uk-slideshow="min-height: 300; max-height: 600;"
  >
    <ul className="uk-slideshow-items">
      <CommonSlideshowItem />
      <CommonSlideshowItem />
      <CommonSlideshowItem />
    </ul>
    <a
      className="uk-position-center-left uk-position-small uk-hidden-hover"
      href="#"
      uk-slideshow-item="previous"
      uk-slidenav-previous="true"
    />
    <a
      className="uk-position-center-right uk-position-small uk-hidden-hover"
      href="#"
      uk-slideshow-item="next"
      uk-slidenav-next="true"
    />
    <div className="uk-position-bottom-center uk-position-small">
      <ul className="uk-slideshow-nav uk-dotnav" />
    </div>
  </section>
);

export default CommonSlideshow;
