import { Link } from '@foundation/next';
import CommonToolbarMap from '@shop/components/Common/Toolbar/Map';

const CommonToolbarMenuAddress = () => (
  <li>
    <Link href="/contacts" tmp-next-on-click="return false">
      <span
        className="uk-margin-xsmall-right"
        uk-icon="icon: location; ratio: .75;"
      />
      <span className="tm-pseudo">Store in Brussels</span>
      <span uk-icon="icon: triangle-down; ratio: .75;" />
    </Link>
    <div
      className="uk-margin-remove"
      uk-drop="mode: click; pos: bottom-center;"
    >
      <div className="uk-card uk-card-default uk-card-small uk-box-shadow-xlarge uk-overflow-hidden uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
        <CommonToolbarMap />
        <div className="uk-card-body">
          <div className="uk-text-small">
            <div className="uk-text-bolder">Store Name</div>
            <div>Blvd. de Waterloo 59, Brussels, Belgium</div>
            <div>Daily 10:00–22:00</div>
          </div>
          <div className="uk-margin-small">
            <Link
              className="uk-link-muted uk-text-uppercase tm-link-to-all uk-link-reset"
              href="/contacts"
            >
              <span>contacts</span>
              <span uk-icon="icon: chevron-right; ratio: .75;" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </li>
);

export default CommonToolbarMenuAddress;
