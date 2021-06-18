import { Link } from '@foundation/next';

const CommonSidebar = () => (
  <aside className="uk-width-1-1 uk-width-1-4@m tm-aside-column tm-ignore-margin-bottom">
    <section
      className="uk-card uk-card-default uk-card-small tm-ignore-container"
      uk-sticky="offset: 90; bottom: true;"
    >
      <nav>
        <ul className="uk-nav uk-nav-default tm-nav">
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
          <Link href="/faq" as="li">
            FAQ
          </Link>
          <Link href="/delivery" as="li">
            Delivery
          </Link>
        </ul>
      </nav>
    </section>
  </aside>
);

export default CommonSidebar;
