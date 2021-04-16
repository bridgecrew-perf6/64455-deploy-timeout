import { Link } from '@foundation/next';

const ArticleListItem = () => (
  <div>
    <Link href="/article">
      <article className="uk-card uk-card-default uk-card-small uk-overflow-hidden uk-link-heading uk-display-block uk-box-shadow-hover-large uk-height-1-1 tm-ignore-container">
        {/* Preview */}
        <div className="uk-card-media-top">
          <figure className="uk-margin-remove tm-ratio tm-ratio-16-9">
            <div className="uk-cover-container">
              <img
                src="/images/articles/macbook-photo.jpg"
                alt="Everything You Need to Know About the MacBook Pro"
                uk-cover="true"
              />
            </div>
          </figure>
        </div>
        <div className="uk-card-body">
          {/* Date */}
          <div className="uk-article-meta uk-margin-xsmall-bottom">
            <time>May 21, 2018</time>
          </div>
          {/* Title */}
          <h3 className="uk-h4 uk-margin-remove">
            Everything You Need to Know About the MacBook Pro
          </h3>
        </div>
      </article>
    </Link>
  </div>
);

export default ArticleListItem;
