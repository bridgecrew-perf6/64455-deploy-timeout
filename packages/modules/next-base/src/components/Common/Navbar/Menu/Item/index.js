import NavbarItemLink from '@app/components/Common/Navbar/Menu/Item/Link';
import NavbarItemDivider from '@app/components/Common/Navbar/Menu/Item/Divider';

const typeMapping = {
  'navigation.node': NavbarItemLink,
  'navigation.divider': NavbarItemDivider,
};

const Item = node => {
  const Item = typeMapping[node?._type] ?? NavbarItemLink;
  return <Item {...node} />;
};

export default Item;
