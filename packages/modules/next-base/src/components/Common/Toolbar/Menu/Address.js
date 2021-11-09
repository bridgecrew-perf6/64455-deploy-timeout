import { useConfig, useTranslation, Link } from '@foundation/next';

import CommonAddress from '@shop/components/Common/Address';
import CommonMap from '@shop/components/Common/Map';

const CommonToolbarMenuAddress = () => {
  const address = useConfig('shop.address');
  const { t } = useTranslation();

  return (
    <li>
      <Link href="#" onClick={e => e.preventDefault()}>
        <span
          className="uk-margin-xsmall-right"
          uk-icon="icon: location; ratio: .75;"
        />
        <span className="tm-pseudo">
          {`${t('app:storeIn')} ${address('city')}`}
        </span>
        <span
          className="uk-margin-xsmall-left"
          uk-icon="icon: chevron-down; ratio: .75;"
        />
      </Link>
      <div
        className="uk-margin-remove tm-dropdown-address"
        uk-drop="mode: click; pos: bottom-center;"
      >
        <div className="uk-card uk-card-default uk-card-small uk-box-shadow-xlarge uk-overflow-hidden uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
          <CommonMap className="uk-card-media-top uk-height-small" zoom={12} />
          <div className="uk-card-body">
            <CommonAddress className="uk-text-small" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CommonToolbarMenuAddress;
