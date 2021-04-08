import { Link } from '@mono/hooks';
import { useTranslation } from '@mono/hooks';

export default function Links() {
  const { t } = useTranslation();

  return (<>
    <Link href="/" as="li">{t('app:pages.home')}</Link>
    <Link href="/about" as="li">{t('app:pages.about')}</Link>
  </>);
}