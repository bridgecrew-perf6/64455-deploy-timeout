import { Link } from '@foundation/next';

import { useNavigationNode } from '@app/hooks';

import SubMenu from '@app/components/Offcanvas/Nav/Item/SubMenu';

const OffcanvasItemLink = props => {
  const {
    label,
    href,
    partial,
    target,
    nodes,
    recursive,
    options,
    level = 0,
    levels = 1,
  } = useNavigationNode(props, node => {
    if (node._type === 'navigation.divider') {
      return node.label;
    } else {
      return true;
    }
  });

  if (recursive) {
    return (
      <li className="uk-parent">
        <Link
          href={href}
          partial={partial}
          target={target}
          className={options.className}
        >
          {label}
        </Link>
        <SubMenu
          parent={props}
          nodes={nodes}
          level={level + 1}
          levels={levels}
        />
      </li>
    );
  } else {
    return (
      <Link
        as="li"
        href={href}
        partial={partial}
        target={target}
        className={options.className}
      >
        {label}
      </Link>
    );
  }
};

export default OffcanvasItemLink;
