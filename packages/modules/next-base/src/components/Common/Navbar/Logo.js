import { useConfig, Link } from '@foundation/next';
import CommonLogo from '@shop/components/Common/Logo';

const CommonNavbarLogo = () => {
  const config = useConfig('base');
  return (
    <Link className="uk-navbar-item uk-logo" href="/" title={config('name')}>
      <CommonLogo />
    </Link>
  );
};

export default CommonNavbarLogo;
