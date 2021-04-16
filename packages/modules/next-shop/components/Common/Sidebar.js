import { Link } from '@foundation/next';

const CommonSidebar = () => (
  <aside className="uk-width-1-4 uk-visible@m tm-aside-column">
    <section
      className="uk-card uk-card-default uk-card-small"
      uk-sticky="offset: 90; bottom: true;"
    >
      <nav>
        <ul className="uk-nav uk-nav-default tm-nav">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contacts">Contacts</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li className="uk-active">
            <Link href="/news">News</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/delivery">Delivery</Link>
          </li>
        </ul>
      </nav>
    </section>
  </aside>
);

export default CommonSidebar;
