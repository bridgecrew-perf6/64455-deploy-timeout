import { Link } from '@foundation/next';
import { useNavigationNode } from '@app/hooks';

import SingleColumn from '@app/components/Common/Navbar/Menu/Item/Column/Single';
import MultiColumn from '@app/components/Common/Navbar/Menu/Item/Column/Multi';

const Column = ({ nodes, parent, ...props }) => {
  const { itemsPerColumn = 8 } = parent?.options ?? {};
  if (nodes.length < itemsPerColumn) {
    return <SingleColumn nodes={nodes} parent={parent} {...props} />;
  } else {
    return <MultiColumn nodes={nodes} parent={parent} {...props} />;
  }
};

const NavbarDropbarColumn = props => {
  const { label, href, nodes, options, target } = useNavigationNode(props);

  return (
    <div className="uk-margin-top uk-margin-bottom tm-menu-column">
      <Link
        className="uk-link-reset tm-menu-column-header"
        href={href}
        target={target}
        partial
      >
        {options?.image && (
          <img
            className="uk-display-block uk-margin-auto uk-margin-bottom"
            src={options?.image}
            alt={label}
            width={80}
            height={80}
          />
        )}
        <div className="uk-text-bolder">{label}</div>
      </Link>
      <Column nodes={nodes} />
    </div>
  );
};

export default NavbarDropbarColumn;
