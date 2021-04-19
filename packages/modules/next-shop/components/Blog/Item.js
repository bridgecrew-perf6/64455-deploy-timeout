import { Link } from '@foundation/next';
import ArticleItem from '@shop/components/Article/Item';

const BlogItem = () => (
  <div>
    <Link href="/article">
      <ArticleItem />
    </Link>
  </div>
);

export default BlogItem;
