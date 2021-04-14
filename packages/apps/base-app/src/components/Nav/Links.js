import { Link, useTranslation } from '@foundation/next';

export default function Links() {
  const { t } = useTranslation();

  return (
    <>
      <Link href="/" as="li">
        {t('app:pages.home')}
      </Link>
      <Link href="/about" as="li">
        {t('app:pages.about')}
      </Link>
      <Link href="/blog" as="li" partial>
        {t('app:pages.blog')}
      </Link>
    </>
  );
}
