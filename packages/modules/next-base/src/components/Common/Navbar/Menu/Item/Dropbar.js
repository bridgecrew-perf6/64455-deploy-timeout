import { useMemo } from 'react';

import NavbarDropbarColumn from '@app/components/Common/Navbar/Menu/Item/Column';

const NavbarDropbar = ({ parent, nodes }) => {
  const columns = useMemo(() => {
    if (!Array.isArray(nodes)) return [];
    return nodes.filter(n => n._type === 'navigation.node');
  }, [nodes]);

  const menuClassName =
    parent?.options?.menuClassName ?? `uk-child-width-1-${columns.length}`;

  return (
    <div
      className="uk-navbar-dropdown uk-margin-remove uk-padding-remove-vertical"
      uk-drop="pos: bottom-justify; delay-show: 125; delay-hide: 50; duration: 75; boundary: .tm-navbar-container; boundary-align: true; pos: bottom-justify; flip: x"
    >
      <div className="uk-container">
        <ul
          className={`uk-navbar-dropdown-grid uk-grid-collapse ${menuClassName}`}
          uk-grid="true"
        >
          {columns.map(column => (
            <li
              key={column._key ?? column._id}
              className={column.options?.menuClassName}
            >
              <NavbarDropbarColumn parent={parent} {...column} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavbarDropbar;
