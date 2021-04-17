import { Link } from '@foundation/next';

const CommonFooterMainRight = () => (
  <div>
    <ul className="uk-nav uk-nav-default">
      <Link href="/about" as="li">
        About
      </Link>
      <Link href="/contacts" as="li">
        Contacts
      </Link>
      <Link href="/blog" as="li">
        Blog
      </Link>
      <Link href="/news" as="li">
        News
      </Link>
    </ul>
  </div>
);

export default CommonFooterMainRight;
