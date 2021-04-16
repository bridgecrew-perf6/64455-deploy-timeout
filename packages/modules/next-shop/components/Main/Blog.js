import { Link } from '@foundation/next';
import ArticleItem from '@shop/components/Article/Item';

const MainBlog = () => (
  <section className="uk-section uk-section-small">
    <div className="uk-container">
      <h2 className="uk-text-center">Blog</h2>
      <div
        className="uk-grid-medium uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s"
        uk-grid="true"
      >
        <div>
          <Link href="/article">
            <ArticleItem />
          </Link>
        </div>
        <div>
          <Link href="/article">
            <ArticleItem />
          </Link>
        </div>
      </div>
      <div className="uk-margin uk-text-center">
        <Link
          className="uk-link-muted uk-text-uppercase tm-link-to-all"
          href="/blog"
        >
          <span>see all articles</span>
          <span uk-icon="icon: chevron-right; ratio: .75;" />
        </Link>
      </div>
    </div>
  </section>
);

export default MainBlog;
