import ArticleListItem from '@shop/components/Article/List/Item';

const ArticleList = () => (
  <section>
    <h2 className="uk-text-center">Related Articles</h2>
    <div
      className="uk-grid-medium uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-4@m"
      uk-grid="true"
    >
      <ArticleListItem />
      <ArticleListItem />
    </div>
  </section>
);

export default ArticleList;
