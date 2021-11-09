import Item from '@app/components/Common/Navbar/Menu/Item';

const NavbarDropdown = ({ parent, nodes, level = 0, levels = 0 }) => {
  return (
    <div className="uk-navbar-dropdown" uk-dropdown="offset: 0">
      <ul className="uk-nav uk-navbar-dropdown-nav">
        {nodes.map(node => (
          <Item
            key={node._key ?? node._id}
            parent={parent}
            level={level}
            levels={levels}
            {...node}
          />
        ))}
      </ul>
    </div>
  );
};

export default NavbarDropdown;
