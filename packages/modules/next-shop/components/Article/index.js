import ArticleSection from '@shop/components/Article/Section';
import ArticleList from '@shop/components/Article/List';

const ArticlePage = () => (
  <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
    {/* Article */}
    <ArticleSection />
    {/* Related articles */}
    <ArticleList />
  </div>
);

export default ArticlePage;
