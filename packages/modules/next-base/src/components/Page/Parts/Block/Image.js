const BlockImage = ({ image }) => {
  return (
    <div
      className="uk-overflow-hidden uk-position-cover uk-animation-fade"
      data-part="media"
    >
      <img
        src={image.url}
        width={image.width}
        height={image.height}
        className="tm-image"
        alt="Call-to-Action"
        uk-cover="true"
      />
    </div>
  );
};

export default BlockImage;
