const ProductMediaImages = () => (
  <div>
    <div className="uk-card-body uk-flex uk-flex-center">
      <div className="uk-width-1-2 uk-visible@s">
        <div
          className="tm-thumbnail-slider"
          uk-slider="finite: true; clsVisible: tm-visible"
        >
          <div className="uk-position-relative">
            <div className="uk-slider-container">
              <ul className="tm-slider-items uk-slider-items uk-child-width-1-4 uk-grid uk-grid-small">
                <li uk-slideshow-item={0}>
                  <div className="tm-ratio tm-ratio-1-1">
                    <a className="tm-media-box tm-media-box-frame">
                      <figure className="tm-media-box-wrap">
                        <img
                          src="/images/products/1/1-small.jpg"
                          alt="Apple MacBook Pro 15 (Silver)"
                        />
                      </figure>
                    </a>
                  </div>
                </li>
                <li uk-slideshow-item={1}>
                  <div className="tm-ratio tm-ratio-1-1">
                    <a className="tm-media-box tm-media-box-frame" href="#">
                      <figure className="tm-media-box-wrap">
                        <img
                          src="/images/products/1/1-add-1-small.jpg"
                          alt="Apple MacBook Pro 15 (Silver)"
                        />
                      </figure>
                    </a>
                  </div>
                </li>
                <li uk-slideshow-item={2}>
                  <div className="tm-ratio tm-ratio-1-1">
                    <a className="tm-media-box tm-media-box-frame" href="#">
                      <figure className="tm-media-box-wrap">
                        <img
                          src="/images/products/1/1-add-2-small.jpg"
                          alt="Apple MacBook Pro 15 (Silver)"
                        />
                      </figure>
                    </a>
                  </div>
                </li>
                <li uk-slideshow-item={3}>
                  <div className="tm-ratio tm-ratio-1-1">
                    <a className="tm-media-box tm-media-box-frame" href="#">
                      <figure className="tm-media-box-wrap">
                        <img
                          src="/images/products/1/1-add-3-small.jpg"
                          alt="Apple MacBook Pro 15 (Silver)"
                        />
                      </figure>
                    </a>
                  </div>
                </li>
                <li uk-slideshow-item={4}>
                  <div className="tm-ratio tm-ratio-1-1">
                    <a className="tm-media-box tm-media-box-frame" href="#">
                      <figure className="tm-media-box-wrap">
                        <img
                          src="/images/products/1/1-add-4-small.jpg"
                          alt="Apple MacBook Pro 15 (Silver)"
                        />
                      </figure>
                    </a>
                  </div>
                </li>
              </ul>
              <div>
                <a
                  className="uk-position-center-left-out uk-position-small"
                  href="#"
                  uk-slider-item="previous"
                  uk-slidenav-previous="true"
                />
                <a
                  className="uk-position-center-right-out uk-position-small"
                  href="#"
                  uk-slider-item="next"
                  uk-slidenav-next="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className="uk-slideshow-nav uk-dotnav uk-hidden@s" />
    </div>
  </div>
);

export default ProductMediaImages;
