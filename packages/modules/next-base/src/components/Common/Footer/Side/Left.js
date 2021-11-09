import { useConfig, Link } from '@foundation/next';

import CommonLogoInverse from '@shop/components/Common/Logo/Inverse';

const CommonFooterSideLeft = () => {
  const config = useConfig('base');
  return (
    <div className="md:hidden lg:block">
      <Link className="uk-logo" href="/" title={config('name')}>
        <CommonLogoInverse />
      </Link>
      <p className="uk-text-small">{config('description')}</p>
    </div>
  );
};

export default CommonFooterSideLeft;
