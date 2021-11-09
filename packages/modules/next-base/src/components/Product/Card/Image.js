const ProductCardImage = ({ item, image }) => {
  return (
    <figure
      className="tm-media-box-wrap"
      uk-ratio={image.ratio}
      data-placeholder={image.invalid ? true : null}
    >
      <img
        src={image.url}
        width={image.width}
        height={image.height}
        alt={item.title}
      />
    </figure>
  );
};

export default ProductCardImage;
