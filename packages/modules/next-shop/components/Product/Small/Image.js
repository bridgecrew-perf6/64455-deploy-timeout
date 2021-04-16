import { Link } from '@foundation/next';

const ProductSmallImage = () => (
  <div className="uk-width-1-3">
    <div className="tm-ratio tm-ratio-4-3">
      <Link className="tm-media-box" href="/product">
        <figure className="tm-media-box-wrap">
          <img
            src="/images/products/1/1-small.jpg"
            alt="Apple MacBook Pro 15 (Silver)"
          />
        </figure>
      </Link>
    </div>
  </div>
);

export default ProductSmallImage;
