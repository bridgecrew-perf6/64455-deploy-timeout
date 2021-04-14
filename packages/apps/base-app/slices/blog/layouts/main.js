import { useTranslation } from '@foundation/next';

export default function BlogLayout({ children, ...props }) {
  const { t } = useTranslation();

  const className = props.special
    ? `transition uk-heading-medium uk-text-primary`
    : 'transition uk-heading-medium';

  return (
    <div className="uk-container uk-margin-medium-top">
      <h1 className={className}>{t('app:pages.blog')}</h1>
      {children}
    </div>
  );
}
