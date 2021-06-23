import CookieConsent from '@foundation/components/CookieConsent';
import { UIkit } from '@foundation/lib/uikit'; // direct

import Nav from '@app/components/Nav';
import OffCanvas from '@app/components/Nav/Offcanvas';

export default function MainLayout({ children }) {
  return (
    <UIkit>
      <Nav />
      {children}
      <OffCanvas />
      <CookieConsent />
    </UIkit>
  );
}
