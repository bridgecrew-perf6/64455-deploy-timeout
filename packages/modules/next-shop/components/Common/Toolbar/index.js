import CommonToolbarLeft from '@shop/components/Common/Toolbar/Left';
import CommonToolbarRight from '@shop/components/Common/Toolbar/Right';

const CommonToolbar = () => (
  <div className="uk-container" uk-navbar="true">
    <CommonToolbarLeft />
    <CommonToolbarRight />
  </div>
);

export default CommonToolbar;
