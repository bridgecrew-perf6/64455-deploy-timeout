import ImageItem from '@shop/components/Page/Parts/Image/Item';

import colors from '@shop/config/colors';

const ImageGrid = ({
  children,
  title,
  images,
  className,
  renderItem,
  style,
  color,
  ratio,
  overlays = false,
  columns = 2,
  expand = true,
  type = 'image.grid',
  options = 'true',
}) => {
  className = className ?? `uk-child-width-1-${columns}@s`;
  color = colors.includes(color) ? color : 'default';

  let sectionClass = expand && style !== 'framed' ? 'tm-expand' : 'tm-frame';
  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';

  return (
    <section
      className={`tm-section ${sectionClass}`}
      data-section={type}
      data-columns={columns}
    >
      {title && <h3 className="tm-section-title">{title}</h3>}
      <div
        className={`uk-grid uk-grid-collapse uk-background-${color} ${className}`}
        uk-grid={options}
      >
        {images.map(image => (
          <ImageItem
            key={image._key}
            image={image}
            ratio={ratio}
            overlays={overlays}
            renderItem={renderItem}
            cover
          />
        ))}
      </div>
      {children}
    </section>
  );
};

export default ImageGrid;
