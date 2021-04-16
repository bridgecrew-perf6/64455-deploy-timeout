import CookieConsent from '@foundation/components/CookieConsent';
import { UIkit } from '@foundation/next';

export default function MainLayout({ children }) {
  return (
    <>
      <UIkit>
        {children}
        <CookieConsent />
      </UIkit>
    </>
  );
}
