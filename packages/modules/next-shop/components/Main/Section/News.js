import { Link } from '@foundation/next';

const MainSectionNews = () => (
  <section>
    <h2 className="uk-text-center uk-text-left@s">Latest News</h2>
    <ul className="uk-list uk-list-small uk-list-divider">
      <li>
        <article className="uk-article">
          <div className="uk-article-body">
            {/* Date */}
            <div className="uk-article-meta uk-margin-xsmall-bottom">
              <time>June 4, 2018</time>
            </div>
            {/* Title */}
            <h3 className="uk-h4 uk-margin-remove">
              <Link className="uk-link-heading" href="/article">
                Highlights from WWDC
              </Link>
            </h3>
            {/* Description */}
            <div className="uk-margin-xsmall-top uk-text-small">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                sodales eget ipsum id aliquam. Nam consectetur interdum nibh
                eget sodales. Cras volutpat efficitur ornare.
              </p>
            </div>
          </div>
        </article>
      </li>
      <li>
        <article className="uk-article">
          <div className="uk-article-body">
            {/* Date */}
            <div className="uk-article-meta uk-margin-xsmall-bottom">
              <time>June 4, 2018</time>
            </div>
            {/* Title */}
            <h3 className="uk-h4 uk-margin-remove">
              <Link className="uk-link-heading" href="/article">
                Apple introduces macOS Mojave
              </Link>
            </h3>
            {/* Description */}
            <div className="uk-margin-xsmall-top uk-text-small">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                sodales eget ipsum id aliquam. Nam consectetur interdum nibh
                eget sodales. Cras volutpat efficitur ornare.
              </p>
            </div>
          </div>
        </article>
      </li>
      <li>
        <article className="uk-article">
          <div className="uk-article-body">
            {/* Date */}
            <div className="uk-article-meta uk-margin-xsmall-bottom">
              <time>May 29, 2018</time>
            </div>
            {/* Title */}
            <h3 className="uk-h4 uk-margin-remove">
              <Link className="uk-link-heading" href="/article">
                iOS 11.4 brings stereo pairs and multi-room audio with AirPlay 2
              </Link>
            </h3>
            {/* Description */}
            <div className="uk-margin-xsmall-top uk-text-small">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                sodales eget ipsum id aliquam. Nam consectetur interdum nibh
                eget sodales. Cras volutpat efficitur ornare.
              </p>
            </div>
          </div>
        </article>
      </li>
    </ul>
    <div className="uk-margin uk-text-center uk-text-left@s">
      <Link
        className="uk-link-muted uk-text-uppercase tm-link-to-all"
        href="/news"
      >
        <span>see all news</span>
        <span uk-icon="icon: chevron-right; ratio: .75;" />
      </Link>
    </div>
  </section>
);

export default MainSectionNews;
