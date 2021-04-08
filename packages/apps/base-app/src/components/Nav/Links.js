import { Link } from '@atelierfabien/mono-next/lib/navigation';
import useTranslation from 'next-translate/useTranslation';

export default function Links() {
  const { t } = useTranslation('common');

  return (<>
    <Link href="/" as="li">{t('pages.home')}</Link>
    <Link href="/about" as="li">{t('pages.about')}</Link>
  </>);
}