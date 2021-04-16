import { Link } from '@foundation/next';
import CommonLogo from '@shop/components/Common/Logo';

const CommonNavbarLogo = () => (
  <Link className="uk-navbar-item uk-logo" href="/">
    <CommonLogo />
  </Link>
);

export default CommonNavbarLogo;
