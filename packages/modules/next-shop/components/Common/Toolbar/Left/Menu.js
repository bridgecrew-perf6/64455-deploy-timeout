import CommonToolbarMenuPhone from '@shop/components/Common/Toolbar/Menu/Phone';
import CommonToolbarMenuAddress from '@shop/components/Common/Toolbar/Menu/Address';
import CommonToolbarMenuOpeninghours from '@shop/components/Common/Toolbar/Menu/Openinghours';

const CommonToolbarLeftMenu = () => (
  <ul className="uk-navbar-nav">
    {/* Phone */}
    <CommonToolbarMenuPhone />
    {/* Address */}
    <CommonToolbarMenuAddress />
    {/* Opening hours */}
    <CommonToolbarMenuOpeninghours />
  </ul>
);

export default CommonToolbarLeftMenu;
