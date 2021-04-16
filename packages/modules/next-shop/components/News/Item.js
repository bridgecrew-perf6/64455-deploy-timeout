import { Link } from '@foundation/next';

const NewsItem = () => (
  <article className="uk-article">
    <div className="uk-article-body">
      {/* Date */}
      <div className="uk-article-meta uk-margin-xsmall-bottom">
        <time>June 4, 2018</time>
      </div>
      {/* Title */}
      <div>
        <h3>
          <Link className="uk-link-heading" href="/article">
            Highlights from WWDC
          </Link>
        </h3>
      </div>
      {/* Description */}
      <div className="uk-margin-small-top">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales
          eget ipsum id aliquam. Nam consectetur interdum nibh eget sodales.
          Cras volutpat efficitur ornare.
        </p>
      </div>
    </div>
  </article>
);

export default NewsItem;
