import { useMemo } from 'react';
import ImageItem from '@shop/components/Page/Parts/Image/Item';

import { Overlay, RenderNull } from '@shop/components/Page/Parts/Image/Overlay';

const ImageSlideshow = ({
  children,
  title,
  images,
  renderItem,
  style,
  className = '',
  overlays = false,
  ratio = 3 / 2,
  expand = true,
  navigation = true,
  navigationOutside = false,
  type = 'image.slideshow',
  options = 'min-height: 500; animation: push',
}) => {
  let sectionClass = expand && style !== 'framed' ? 'tm-expand' : 'tm-frame';
  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';

  const Item = useMemo(() => {
    if (typeof renderItem === 'function') {
      return renderItem;
    } else if (overlays && navigationOutside) {
      return Overlay;
    } else {
      return RenderNull;
    }
  }, [navigationOutside, overlays, renderItem]);

  return (
    <section
      className={`tm-section ${className} ${sectionClass}`}
      data-section={type}
    >
      {title && <h3 className="tm-section-title">{title}</h3>}
      <div uk-slideshow={`ratio: ${ratio}:1; ${options}`}>
        <div className=" uk-position-relative uk-visible-toggle" tabIndex="-1">
          <div className="uk-light">
            <ul className="uk-slideshow-items">
              {images.map(image => (
                <li key={image._key}>
                  <ImageItem
                    key={image._key}
                    image={image}
                    className="tm-slideshow-image"
                    cover
                  />
                  <Item image={image} className="uk-transition-slide-bottom" />
                </li>
              ))}
            </ul>
            <a
              className="uk-position-center-left uk-position-small uk-hidden-hover"
              href="#"
              uk-slidenav-previous="true"
              uk-slideshow-item="previous"
            />
            <a
              className="uk-position-center-right uk-position-small uk-hidden-hover"
              href="#"
              uk-slidenav-next="true"
              uk-slideshow-item="next"
            />
            {navigation && !navigationOutside && (
              <div className="uk-position-bottom-center uk-position-medium">
                <ul className="uk-slideshow-nav uk-dotnav" />
              </div>
            )}
          </div>
          {navigation && navigationOutside && (
            <ul className="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin" />
          )}
        </div>
      </div>
      {children}
    </section>
  );
};

export default ImageSlideshow;
