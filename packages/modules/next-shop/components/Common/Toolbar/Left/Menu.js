import CommonToolbarMenuPhone from '@shop/components/Common/Toolbar/Menu/Phone';
import CommonToolbarMenuAddress from '@shop/components/Common/Toolbar/Menu/Address';
import CommonToolbarMenuAddon from '@shop/components/Common/Toolbar/Menu/Addon';

const CommonToolbarLeftMenu = () => (
  <ul className="uk-navbar-nav">
    {/* Phone */}
    <CommonToolbarMenuPhone />
    {/* Address */}
    <CommonToolbarMenuAddress />
    {/* Opening hours */}
    <CommonToolbarMenuAddon />
  </ul>
);

export default CommonToolbarLeftMenu;
