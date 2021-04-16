import { Link } from '@foundation/next';

const CommonFooterMainRight = () => (
  <div>
    <ul className="uk-nav uk-nav-default">
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/contacts">Contacts</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <Link href="/news">News</Link>
      </li>
    </ul>
  </div>
);

export default CommonFooterMainRight;
