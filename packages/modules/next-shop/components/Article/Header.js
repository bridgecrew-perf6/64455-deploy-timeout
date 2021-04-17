import { Link } from '@foundation/next';

const ArticleHeader = () => (
  <section className="uk-text-center">
    <ul className="uk-breadcrumb uk-flex-center uk-margin-remove">
      <Link href="/" as="li">
        Home
      </Link>
      <Link href="/blog" as="li">
        Blog
      </Link>
      <li>
        <span>Everything You Need to Know About the MacBook Pro</span>
      </li>
    </ul>
  </section>
);

export default ArticleHeader;
