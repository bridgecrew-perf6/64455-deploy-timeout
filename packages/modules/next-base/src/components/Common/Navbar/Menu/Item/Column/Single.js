import NavbarItemLink from '@app/components/Common/Navbar/Menu/Item/Link';

const SingleColumn = ({ parent, nodes }) => (
  <ul className="uk-nav uk-nav-default">
    {nodes.map(node => (
      <NavbarItemLink key={node._key ?? node._id} parent={parent} {...node} />
    ))}
  </ul>
);

export default SingleColumn;
