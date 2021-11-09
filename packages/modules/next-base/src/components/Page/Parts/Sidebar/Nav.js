import SidebarLink from '@shop/components/Page/Parts/Sidebar/Link';

const SidebarNav = ({ type, items = [], ...props }) => {
  return (
    <nav>
      <ul className="uk-nav uk-nav-default tm-nav">
        {items.map(item => (
          <SidebarLink
            key={item._key ?? item._id}
            type={type}
            item={item}
            {...props}
          />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
