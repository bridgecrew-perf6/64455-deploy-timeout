import { useTranslation } from '@foundation/next';

import SidebarMenu from '@shop/components/Page/Parts/Sidebar/Menu';

const SidebarLinks = props => {
  const { t } = useTranslation();
  return <SidebarMenu type="link" title={t('app:sidebarLinks')} {...props} />;
};

export default SidebarLinks;
