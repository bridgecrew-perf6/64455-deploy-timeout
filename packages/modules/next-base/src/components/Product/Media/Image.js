import { useMemo } from 'react';
import { Link } from '@foundation/next';

import { buildImage, lookupImageSettings } from '@app/hooks/image';

import ProductMediaOverlay from '@shop/components/Product/Media/Overlay';
import ProductMediaImages from '@shop/components/Product/Media/Images';

const { defaultPlaceholder } = lookupImageSettings('productPage');

const { ratio: defaultRatio, useItemRatio } =
  lookupImageSettings('productPage');

const ImageWrapper = ({ children, href, lightbox = false }) => {
  if (lightbox) {
    return (
      <Link className="tm-media-box tm-media-box-zoom" href={href}>
        {children}
      </Link>
    );
  } else {
    return <div className="tm-media-box">{children}</div>;
  }
};

const ProductMediaImage = ({
  slideshowRef,
  item,
  variant,
  images = [],
  previews = false,
  lightbox = false,
  draggable = true,
  animation = 'slide',
  ratio = defaultRatio,
  hidden = false,
  className = '',
}) => {
  const imageRatio = useItemRatio ? item.ratio ?? ratio : ratio;

  const slideshowImages = useMemo(() => {
    const imgs = images.length > 0 ? images : [{}];
    return imgs.map(image => {
      return {
        ...buildImage(image, {
          ratio: imageRatio,
          format: 'jpg',
          placeholder: defaultPlaceholder,
        }),
        title: image.title ?? item.name,
      };
    });
  }, [imageRatio, images, item.name]);

  return (
    <div
      ref={slideshowRef}
      className={className}
      uk-slideshow={`finite: true; animation: ${animation}; ratio: ${imageRatio}; draggable: ${draggable}`}
      hidden={hidden}
    >
      <div>
        <ul
          className="uk-slideshow-items"
          uk-lightbox={lightbox ? 'delay-controls: 1000' : null}
        >
          {slideshowImages.map((image, i) => (
            <li key={image._key ?? i} data-image-key={image._key}>
              <ImageWrapper href={image.url} lightbox={lightbox}>
                <figure
                  className="tm-media-box-wrap"
                  data-placeholder={image.invalid ? true : null}
                >
                  <img src={image.url} alt={image.title} uk-cover="true" />
                </figure>
              </ImageWrapper>
            </li>
          ))}
        </ul>
        <ProductMediaOverlay item={item} variant={variant} size="large" />
      </div>
      {/* Additional images */}
      {previews && (
        <ProductMediaImages item={item} variant={variant} images={images} />
      )}
    </div>
  );
};

export default ProductMediaImage;
