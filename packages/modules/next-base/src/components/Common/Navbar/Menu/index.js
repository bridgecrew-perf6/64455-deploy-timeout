import { useNavigation } from '@app/hooks';

import NavbarItem from '@app/components/Common/Navbar/Menu/Item';

const CommonNavbarMenu = () => {
  const [primary, primaryNodes] = useNavigation('primary');
  return (
    <ul className="uk-navbar-nav">
      {primaryNodes.map(node => (
        <NavbarItem
          key={node._key ?? node._id}
          parent={primary}
          levels={2}
          {...node}
        />
      ))}
    </ul>
  );
};

export default CommonNavbarMenu;
