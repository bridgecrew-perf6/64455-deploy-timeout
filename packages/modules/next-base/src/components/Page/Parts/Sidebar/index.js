import { get, usePageFragments } from '@foundation/next';

import SidebarNavigation from '@shop/components/Page/Parts/Sidebar/Navigation';
import SidebarLinks from '@shop/components/Page/Parts/Sidebar/Links';
import SidebarFiles from '@shop/components/Page/Parts/Sidebar/Files';
import SidebarPages from '@shop/components/Page/Parts/Sidebar/Pages';
import SidebarFragment from '@shop/components/Page/Parts/Sidebar/Fragment';

const Wrapper = ({ layout, children }) => {
  if (layout !== 'split') {
    return (
      <div className="uk-card uk-card-default uk-card-small tm-ignore-container">
        {children}
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

const Menu = ({ page, ...props }) => {
  const { navigation, files = [], links = [], pages = [] } = page ?? {};

  const { sidebar } = usePageFragments(page);

  const sidebarNodes = get(sidebar, ['navigation', 'nodes'], []);
  const pageNodes = get(navigation, ['nodes'], []);
  const nodes = sidebarNodes.concat(pageNodes);

  if (
    sidebarNodes.length > 0 ||
    nodes.length > 0 ||
    files.length > 0 ||
    links.length > 0 ||
    pages.length > 0 ||
    sidebar
  ) {
    return (
      <aside className="uk-width-1-1 uk-width-1-4@m tm-aside-column tm-ignore-margin-bottom">
        <section className="tm-sidebar" uk-sticky="offset: 90; bottom: true;">
          <Wrapper {...props}>
            <SidebarFragment
              fragment={sidebar}
              section="sidebar.fragment"
              {...props}
            />
            <SidebarNavigation
              items={nodes}
              section="sidebar.navigation"
              {...props}
            />
            <SidebarLinks items={links} section="sidebar.links" {...props} />
            <SidebarPages items={pages} section="sidebar.pages" {...props} />
            <SidebarFiles items={files} section="sidebar.files" {...props} />
          </Wrapper>
        </section>
      </aside>
    );
  } else {
    return null;
  }
};

export default Menu;
