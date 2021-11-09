import { useNavigation } from '@app/hooks';

import MenuItem from '@app/components/Offcanvas/Nav/Item';

const OffcanvasNavMenu = () => {
  const [primary, primaryNodes] = useNavigation('primary');
  const [secondary, secondaryNodes] = useNavigation('secondary');
  const [toolbar, toolbarNodes] = useNavigation('toolbar');
  return (
    <nav className="uk-card-small uk-card-body">
      <ul
        className="uk-nav-default uk-nav-parent-icon uk-list-divider"
        uk-nav="true"
      >
        {primaryNodes.map(node => (
          <MenuItem
            key={node._key ?? node._id}
            parent={primary}
            levels={2}
            {...node}
          />
        ))}
        {secondaryNodes.map(node => (
          <MenuItem
            key={node._key ?? node._id}
            parent={secondary}
            levels={2}
            {...node}
          />
        ))}
        {toolbarNodes.map(node => (
          <MenuItem
            key={node._key ?? node._id}
            parent={toolbar}
            levels={2}
            {...node}
          />
        ))}
      </ul>
    </nav>
  );
};

export default OffcanvasNavMenu;
