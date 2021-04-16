import { Link } from '@foundation/next';

const ProductMediaImage = () => (
  <div>
    <ul className="uk-slideshow-items" uk-lightbox="true">
      <li>
        <Link
          className="uk-card-body tm-media-box tm-media-box-zoom"
          href="/images/products/1/1-large.jpg"
        >
          <figure className="tm-media-box-wrap">
            <img
              src="/images/products/1/1-large.jpg"
              alt="Apple MacBook Pro 15 (Silver)"
            />
          </figure>
        </Link>
      </li>
      <li>
        <Link
          className="uk-card-body tm-media-box tm-media-box-zoom"
          href="/images/products/1/1-add-1-large.jpg"
        >
          <figure className="tm-media-box-wrap">
            <img
              src="/images/products/1/1-add-1-large.jpg"
              alt="Apple MacBook Pro 15 (Silver)"
            />
          </figure>
        </Link>
      </li>
      <li>
        <Link
          className="uk-card-body tm-media-box tm-media-box-zoom"
          href="/images/products/1/1-add-2-large.jpg"
        >
          <figure className="tm-media-box-wrap">
            <img
              src="/images/products/1/1-add-2-large.jpg"
              alt="Apple MacBook Pro 15 (Silver)"
            />
          </figure>
        </Link>
      </li>
      <li>
        <Link
          className="uk-card-body tm-media-box tm-media-box-zoom"
          href="/images/products/1/1-add-3-large.jpg"
        >
          <figure className="tm-media-box-wrap">
            <img
              src="/images/products/1/1-add-3-large.jpg"
              alt="Apple MacBook Pro 15 (Silver)"
            />
          </figure>
        </Link>
      </li>
      <li>
        <Link
          className="uk-card-body tm-media-box tm-media-box-zoom"
          href="/images/products/1/1-add-4-large.jpg"
        >
          <figure className="tm-media-box-wrap">
            <img
              src="/images/products/1/1-add-4-large.jpg"
              alt="Apple MacBook Pro 15 (Silver)"
            />
          </figure>
        </Link>
      </li>
    </ul>
  </div>
);

export default ProductMediaImage;
