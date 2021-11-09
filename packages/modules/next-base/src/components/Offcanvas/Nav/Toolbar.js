import { useNavigation } from '@app/hooks';

import MenuItem from '@app/components/Offcanvas/Nav/Item';

const OffcanvasNavToolbar = () => {
  const [navigation, nodes] = useNavigation('toolbar');
  return (
    <nav className="uk-card-small uk-card-body">
      <ul
        className="uk-nav-default uk-nav-parent-icon uk-list-divider"
        uk-nav="true"
      >
        {nodes.map(node => (
          <MenuItem key={node._key ?? node._id} parent={navigation} {...node} />
        ))}
      </ul>
    </nav>
  );
};

export default OffcanvasNavToolbar;
