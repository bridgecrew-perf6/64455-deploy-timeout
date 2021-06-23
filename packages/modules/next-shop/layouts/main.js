import CookieConsent from '@foundation/components/CookieConsent';
import { UIkit } from '@foundation/lib/uikit'; // direct

import CommonScripts from '@shop/components/Common/Scripts';

const MainLayout = ({ children }) => {
  return (
    <>
      <CommonScripts />
      <UIkit>
        {children}
        <CookieConsent />
      </UIkit>
    </>
  );
};

export default MainLayout;
