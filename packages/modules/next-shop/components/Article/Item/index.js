import ArticleItemPreview from '@shop/components/Article/Item/Preview';
import ArticleItemBody from '@shop/components/Article/Item/Body';

const ArticleItem = () => (
  <article className="uk-card uk-card-default uk-card-small uk-article uk-overflow-hidden uk-box-shadow-hover-large uk-height-1-1 tm-ignore-container">
    {/* Preview */}
    <ArticleItemPreview />
    <div className="uk-card-body">
      <ArticleItemBody />
    </div>
  </article>
);

export default ArticleItem;
