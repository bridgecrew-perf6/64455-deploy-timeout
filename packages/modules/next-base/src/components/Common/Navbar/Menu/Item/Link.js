import { Link } from '@foundation/next';

import { useNavigationNode } from '@app/hooks';

const NavbarItemLink = props => {
  const { label, href, partial, target, recursive, options, buildDropdown } =
    useNavigationNode(props);

  return (
    <Link
      as="li"
      href={href}
      partial={partial}
      target={target}
      className={options.className}
      after={buildDropdown}
      shallow={props.shallow}
      replace={props.replace}
    >
      {label}
      {recursive && (
        <span
          className="uk-margin-xsmall-left"
          uk-icon="icon: chevron-down; ratio: .75;"
        />
      )}
    </Link>
  );
};

export default NavbarItemLink;
