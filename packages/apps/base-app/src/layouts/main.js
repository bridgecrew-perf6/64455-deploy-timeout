import CookieConsent from '@foundation/components/CookieConsent';
import { UIkit } from '@foundation/next';

import Nav from '@app/components/Nav';
import OffCanvas from '@app/components/Nav/Offcanvas';

export default function MainLayout({ children }) {
  return (
    <UIkit fadeIn>
      <Nav />
      {children}
      <OffCanvas />
      <CookieConsent />
    </UIkit>
  );
}
