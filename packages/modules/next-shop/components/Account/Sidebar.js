import { Link } from '@foundation/next';
import AccountNav from '@shop/components/Account/Nav';

const AccountSidebar = () => (
  <div className="uk-width-1-1 uk-width-1-4@m tm-aside-column">
    <div
      className="uk-card uk-card-default uk-card-small tm-ignore-container"
      uk-sticky="offset: 90; bottom: true; media: @m;"
    >
      {/* Profile */}
      <div className="uk-card-header">
        <div className="uk-grid-small uk-child-width-1-1" uk-grid="true">
          <section>
            <div className="uk-width-1-3 uk-width-1-4@s uk-width-1-2@m uk-margin-auto uk-visible-toggle uk-position-relative uk-border-circle uk-overflow-hidden uk-light">
              <img className="uk-width-1-1" src="/images/avatar.jpg" />
              <a
                className="uk-link-reset uk-overlay-primary uk-position-cover uk-hidden-hover"
                href="#"
              >
                <div className="uk-position-center">
                  <span uk-icon="icon: camera; ratio: 1.25;" />
                </div>
              </a>
            </div>
          </section>
          <div className="uk-text-center">
            <div className="uk-h4 uk-margin-remove">Thomas Bruns</div>
            <div className="uk-text-meta">Joined June 6, 2018</div>
          </div>
          <div>
            <div className="uk-grid-small uk-flex-center" uk-grid="true">
              <div>
                <Link
                  className="uk-button uk-button-default uk-button-small"
                  href="/account/settings"
                >
                  <span
                    className="uk-margin-xsmall-right"
                    uk-icon="icon: cog; ratio: .75;"
                  />
                  <span>Settings</span>
                </Link>
              </div>
              <div>
                <button
                  className="uk-button uk-button-default uk-button-small"
                  href="#"
                  title="Log out"
                  type="button"
                >
                  <span uk-icon="icon: sign-out; ratio: .75;" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <AccountNav />
      </div>
    </div>
  </div>
);

export default AccountSidebar;
