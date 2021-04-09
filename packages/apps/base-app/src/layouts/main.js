
import CookieConsent from '@mono/components/CookieConsent';
import { UIkit } from '@mono/next';

import Nav from '@app/components/Nav';
import OffCanvas from '@app/components/Nav/Offcanvas';

export default function MainLayout({ children, ...props }) {
  return (<UIkit>
    <Nav />
    {children}
    <OffCanvas />
    <CookieConsent />
  </UIkit>);
}