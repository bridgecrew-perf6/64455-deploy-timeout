import { Link } from '@foundation/next';

import Social from '@shop/components/Common/Social';
import CommonLogoInverse from '@shop/components/Common/Logo/Inverse';

const CommonFooterSideLeft = () => (
  <div>
    <Link className="uk-logo" href="/">
      <CommonLogoInverse />
    </Link>
    <p className="uk-text-small">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut mauris
      eros. Nulla quis ante sed tortor efficitur facilisis.
    </p>
    <Social />
  </div>
);

export default CommonFooterSideLeft;
