import ArticleSection from '@shop/components/Article/Section';
import ArticleList from '@shop/components/Article/List';

const ArticlePage = () => (
  <div className="uk-grid-medium uk-child-width-1-1" uk-grid="true">
    {/* Article */}
    <ArticleSection></ArticleSection>
    {/* Related articles */}
    <ArticleList></ArticleList>
  </div>
);

export default ArticlePage;
