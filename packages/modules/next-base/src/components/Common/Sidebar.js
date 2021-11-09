import { usePropsOrPage } from '@foundation/next';

import PageSidebar from '@shop/components/Page/Parts/Sidebar';

const CommonSidebar = ({ page, ...props }) => {
  page = usePropsOrPage(page);

  return (
    <PageSidebar
      page={page}
      {...props}
      layout="default"
      dividers={false}
      titles={false}
    />
  );
};

export default CommonSidebar;
