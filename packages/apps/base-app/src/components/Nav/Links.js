import { Link } from '@mono/lib/navigation';
import { useTranslation } from '@app/state';

export default function Links() {
  const { t } = useTranslation();

  return (<>
    <Link href="/" as="li">{t('app:pages.home')}</Link>
    <Link href="/about" as="li">{t('app:pages.about')}</Link>
  </>);
}