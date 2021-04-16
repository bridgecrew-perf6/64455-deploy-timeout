import { Link } from '@foundation/next';

const ArticleHeader = () => (
  <section className="uk-text-center">
    <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <span>Everything You Need to Know About the MacBook Pro</span>
      </li>
    </ul>
  </section>
);

export default ArticleHeader;
