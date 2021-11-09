import { useNavigation } from '@app/hooks';

import CommonToolbarMenuPhone from '@shop/components/Common/Toolbar/Menu/Phone';
import CommonToolbarMenuAddress from '@shop/components/Common/Toolbar/Menu/Address';

import NavbarItem from '@app/components/Common/Navbar/Menu/Item';

const CommonToolbarRightMenu = () => {
  const [navigation, nodes] = useNavigation('toolbar');
  return (
    <ul className="uk-navbar-nav">
      {nodes.map(node => (
        <NavbarItem key={node._key ?? node._id} parent={navigation} {...node} />
      ))}
      {/* Phone */}
      <CommonToolbarMenuPhone />
      {/* Address */}
      <CommonToolbarMenuAddress />
    </ul>
  );
};

export default CommonToolbarRightMenu;
