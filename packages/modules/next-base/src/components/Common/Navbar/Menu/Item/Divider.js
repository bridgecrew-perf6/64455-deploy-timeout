const NavbarItemDivider = props => {
  if (props.rule || !props.title) {
    return <li className="uk-nav-divider" />;
  } else if (props.title) {
    return <li className="uk-nav-header">{props.title}</li>;
  } else {
    return null;
  }
};

export default NavbarItemDivider;
