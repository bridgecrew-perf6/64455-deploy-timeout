import { useRef } from 'react';

import { useSlideshowImages } from '@app/hooks/image';

import ProductMediaImage from '@shop/components/Product/Media/Image';

const ProductMedia = ({ item, variant, images, animation = 'slide' }) => {
  const mainRef = useRef();
  const coverRef = useRef();

  const [mainImages, showCover] = useSlideshowImages(images, {
    main: mainRef,
    cover: coverRef,
  });

  return (
    <div className="uk-width-1-1 uk-width-expand@m tm-product-media">
      <div className="uk-child-width-1-1 uk-position-relative">
        <div>
          <ProductMediaImage
            slideshowRef={mainRef}
            item={item}
            variant={variant}
            images={mainImages}
            animation={animation}
            previews
            lightbox
          />
          <ProductMediaImage
            slideshowRef={coverRef}
            item={item}
            variant={variant}
            images={mainImages}
            animation="fade"
            className="uk-position-absolute uk-position-z-index uk-width-1-1 uk-position-top-left"
            hidden={!showCover}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductMedia;
