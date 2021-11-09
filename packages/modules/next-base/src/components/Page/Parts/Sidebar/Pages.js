import { useTranslation } from '@foundation/next';

import SidebarMenu from '@shop/components/Page/Parts/Sidebar/Menu';

const SidebarPages = props => {
  const { t } = useTranslation();
  return <SidebarMenu type="page" title={t('app:sidebarPages')} {...props} />;
};

export default SidebarPages;
