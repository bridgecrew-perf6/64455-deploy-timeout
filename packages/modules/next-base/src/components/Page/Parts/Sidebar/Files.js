import { useTranslation } from '@foundation/next';

import SidebarMenu from '@shop/components/Page/Parts/Sidebar/Menu';

const SidebarFiles = props => {
  const { t } = useTranslation();
  return <SidebarMenu type="file" title={t('app:sidebarFiles')} {...props} />;
};

export default SidebarFiles;
