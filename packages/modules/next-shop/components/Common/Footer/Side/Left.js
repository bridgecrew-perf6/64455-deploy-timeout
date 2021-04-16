import { Link } from '@foundation/next';
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
    <ul className="uk-iconnav">
      <li>
        <a href="#" title="Facebook" uk-icon="facebook" />
      </li>
      <li>
        <a href="#" title="Twitter" uk-icon="twitter" />
      </li>
      <li>
        <a href="#" title="YouTube" uk-icon="youtube" />
      </li>
      <li>
        <a href="#" title="Instagram" uk-icon="instagram" />
      </li>
    </ul>
  </div>
);

export default CommonFooterSideLeft;
