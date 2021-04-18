import CookieConsent from '@foundation/components/CookieConsent';
import { UIkit } from '@foundation/next';

import CommonScripts from '@shop/components/Common/Scripts';

export default function MainLayout({ children }) {
  return (
    <>
      <CommonScripts />
      <UIkit>
        {children}
        <CookieConsent />
      </UIkit>
    </>
  );
}
