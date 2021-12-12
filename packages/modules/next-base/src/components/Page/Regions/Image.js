import { useImage } from '@app/hooks/image';

const ImageRegion = ({
  image,
  className,
  alt = '',
  cover = false,
  options = {},
}) => {
  const [img] = useImage(image, { ...options, ...options });

  const { url, width, height } = img;

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
