import { useTranslation } from '@mono/next';

export default function BlogLayout({ children, ...props }) {
  const { t } = useTranslation();
  
  return (<div className="uk-container">
    <h1 className="uk-heading-medium">{t('app:pages.blog')}</h1>
    {children}
  </div>);
}