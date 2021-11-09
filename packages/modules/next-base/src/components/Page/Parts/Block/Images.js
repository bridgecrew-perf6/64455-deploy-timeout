const BlockImages = ({ images = [] }) => {
  return (
    <div
      className="uk-position-cover uk-animation-fade"
      tabIndex="-1"
      uk-slideshow="ratio: false; animation: fade; autoplay: true; pause-on-hover: false; autoplay-interval: 5000"
      data-part="media"
    >
      <ul className="uk-slideshow-items uk-position-cover">
        {images.map(image => (
          <li key={image._key ?? image._id}>
            <img
              key={image._key ?? image._id}
              src={image?.url}
              width={image.width}
              height={image.height}
              className="tm-image"
              alt="Call-to-Action"
              uk-cover="true"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockImages;
