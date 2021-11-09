import NavbarItemLink from '@app/components/Common/Navbar/Menu/Item/Link';

const MultiColumn = ({ parent, nodes }) => (
  <ul
    className="uk-nav uk-nav-default uk-grid-collapse uk-child-width-1-2@m"
    uk-grid="true"
  >
    {nodes.map(node => (
      <NavbarItemLink key={node._key ?? node._id} parent={parent} {...node} />
    ))}
  </ul>
);

export default MultiColumn;
