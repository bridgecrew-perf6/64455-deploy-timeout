import SidebarNav from '@shop/components/Page/Parts/Sidebar/Nav';
import Wrapper from '@shop/components/Page/Parts/Sidebar/Wrapper';

const SidebarMenu = ({
  section,
  type,
  title,
  layout,
  items = [],
  dividers = false,
  titles = false,
}) => {
  if (Array.isArray(items) && items.length > 0) {
    return (
      <Wrapper section={section} layout={layout} dividers={dividers}>
        {titles && title && <h4>{title}</h4>}
        <SidebarNav type={type} items={items} />
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default SidebarMenu;
