import { Link } from '@foundation/next';

const ErrorNotfound = () => (
  <section className="uk-section uk-section-small">
    <div className="uk-container">
      <div className="uk-text-center">
        <h1 className="uk-heading-hero">404</h1>
        <div className="uk-text-lead">Page not found</div>
        <div className="uk-margin-top">
          Looks like the page you're trying to visit doesn't exist.
          <br />
          <Link href="/">Go back to Homepage</Link>
        </div>
      </div>
    </div>
  </section>
);

export default ErrorNotfound;
