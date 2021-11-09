import ImageItem from '@shop/components/Page/Parts/Image/Item';

import colors from '@shop/config/colors';

const ImageSlider = ({
  title,
  images,
  className,
  style,
  color,
  columns = 2,
  expand = true,
  type = 'image.slider',
  options = 'true',
}) => {
  className = className ?? `uk-child-width-1-${columns}@s`;
  color = colors.includes(color) ? color : 'default';

  let sectionClass = expand && style !== 'framed' ? 'tm-expand' : 'tm-frame';
  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';

  return (
    <section className={`tm-section ${sectionClass}`} data-section={type}>
      {title && <h3 className="tm-section-title">{title}</h3>}
      <div uk-slider={options} className={`uk-background-${color}`}>
        <ul className={`uk-slider-items ${className}`}>
          {images.map(image => (
            <li key={image._key}>
              <ImageItem key={image._key} image={image} cover />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ImageSlider;
