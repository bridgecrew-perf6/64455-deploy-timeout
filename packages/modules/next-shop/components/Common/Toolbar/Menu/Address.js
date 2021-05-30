import { Link } from '@foundation/next';

import CommonAddress from '@shop/components/Common/Address';
import CommonMap from '@shop/components/Common/Map';

const CommonToolbarMenuAddress = () => (
  <li>
    <Link href="/contacts" onClick={e => e.preventDefault()}>
      <span
        className="uk-margin-xsmall-right"
        uk-icon="icon: location; ratio: .75;"
      />
      <span className="tm-pseudo">Store in Brussels</span>
      <span
        className="uk-margin-xsmall-left"
        uk-icon="icon: chevron-down; ratio: .75;"
      />
    </Link>
    <div
      className="uk-margin-remove"
      uk-drop="mode: click; pos: bottom-center;"
    >
      <div className="uk-card uk-card-default uk-card-small uk-box-shadow-xlarge uk-overflow-hidden uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
        <CommonMap className="uk-card-media-top uk-height-small" />
        <div className="uk-card-body">
          <CommonAddress className="uk-text-small" />
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
