import ImageItem from '@shop/components/Page/Parts/Image/Item';

import colors from '@shop/config/colors';

const SingleImage = ({
  children,
  image,
  className = '',
  expand = true,
  type = 'image.single',
  ...props
}) => {
  const { palette } = image;
  const title = props.title ?? image.title;

  const style = props.style ?? image.style;
  const frame = style === 'framed';

  let color = props.color ?? image.color;

  color = colors.includes(color) || color === 'image' ? color : 'none';

  if (style === 'default' && expand !== false) expand = true;

  let sectionClass =
    style === 'framed' ? 'tm-frame' : expand ? 'tm-expand' : 'tm-frame';
  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';

  const containerPadding = frame ? 'uk-padding' : '';

  const foreground =
    color === 'default' ||
    color === 'muted' ||
    color === 'image' ||
    color === 'none'
      ? 'uk-dark'
      : 'uk-light';

  const containerClassName = colors.includes(color)
    ? `uk-section-${color} ${foreground} ${containerPadding}`
    : `${foreground} ${containerPadding}`;

  const backgroundColor = color === 'image' ? palette?.background : null;

  return (
    <section
      className={`tm-section ${sectionClass} ${className}`}
      data-section={type}
    >
      {title && <h3 className="tm-section-title">{title}</h3>}
      <div className={containerClassName} style={{ backgroundColor }}>
        <ImageItem image={image} minHeight={props.minHeight} cover />
        {children}
      </div>
    </section>
  );
};

export default SingleImage;
