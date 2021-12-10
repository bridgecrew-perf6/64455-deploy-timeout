import { useImage } from '@app/hooks/image';

const ImageRegion = ({
  item,
  className,
  alt = '',
  cover = false,
  options = {},
}) => {
  const [image] = useImage(item.image, { ...options, ...item.options });

  const { url, width, height } = image;

  return (
    <img
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={className}
      uk-cover={cover ? 'true' : null}
    />
  );
};

export default ImageRegion;
