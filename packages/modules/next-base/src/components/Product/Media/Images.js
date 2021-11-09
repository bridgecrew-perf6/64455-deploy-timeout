import React, { useMemo } from 'react';

import { buildImage } from '@app/hooks/image';
import { isEqual } from '@foundation/lib/util';

const ProductMediaImages = ({ item = {}, images = [] }) => {
  const items = useMemo(() => {
    return images.map(image => {
      return {
        ...buildImage(image, {
          ratio: '1:1',
          scale: 0.2,
          format: 'jpg',
          placeholder: true,
        }),
        title: image.title ?? item.name,
      };
    });
  }, [images, item.name]);

  if (items.length > 1) {
    const containerClass = items.length === 2 ? 'uk-width-1-3' : 'uk-width-1-2';
    const itemsContainerClass =
      items.length === 2 ? 'uk-child-width-1-2' : 'uk-child-width-1-3';

    return (
      <div className="tm-border-top uk-overflow-hidden">
        <div className="uk-card-body uk-flex uk-flex-center">
          <div className={`${containerClass} uk-visible@s`}>
            <div
              className="tm-thumbnail-slider"
              uk-slider="finite: true; clsVisible: tm-visible"
            >
              <div className="uk-position-relative">
                <div className="uk-slider-container">
                  <ul
                    className={`tm-slider-items uk-slider-items ${itemsContainerClass} uk-grid uk-grid-small`}
                  >
                    {items.map((image, i) => (
                      <li key={image._key} uk-slideshow-item={i}>
                        <div>
                          <a
                            className="tm-media-box tm-media-box-frame uk-margin-auto uk-cover-container"
                            uk-ratio="ratio: 1/1;"
                          >
                            <figure className="uk-animation-fade">
                              <img
                                src={image.url}
                                alt={image.title}
                                uk-cover="true"
                              />
                            </figure>
                          </a>
                        </div>
                      </li>
                    ))}
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
  } else {
    return null;
  }
};

export default React.memo(ProductMediaImages, (a, b) => {
  return isEqual(a?.images, b?.images);
});
