import { useMemo } from 'react';

import { Overlay, RenderNull } from '@shop/components/Page/Parts/Image/Overlay';

const ImageItem = ({
  className,
  image,
  cover,
  children,
  overlays,
  renderItem,
  minHeight = 320,
  imageClassName = '',
}) => {
  const { title, url, palette, width, height, ratio } = image;
  className =
    className ??
    (cover ? 'tm-section-image uk-cover-container' : 'tm-section-image');

  const wrapperClassName = image.className ?? '';

  const imageRatio =
    typeof ratio === 'string'
      ? ratio.replace(':', '/')
      : `${width ?? 1}/${height ?? 1}`;

  const Item = useMemo(() => {
    if (typeof renderItem === 'function') {
      return renderItem;
    } else if (overlays) {
      return Overlay;
    } else {
      return RenderNull;
    }
  }, [overlays, renderItem]);

  let itemRatio = `ratio: ${imageRatio}; min-height: ${minHeight}`;

  return (
    <div className={wrapperClassName}>
      <figure
        className={className}
        uk-ratio={itemRatio}
        style={{ backgroundColor: palette?.background }}
      >
        <img
          src={url}
          alt={title}
          width={width}
          height={height}
          className={`tm-image ${imageClassName}`}
          uk-cover={cover ? 'true' : false}
        />
        <Item image={image} />
      </figure>
      {children}
    </div>
  );
};

export default ImageItem;
