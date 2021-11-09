import { useTranslated, Link } from '@foundation/next';

import { useLink } from '@app/hooks';

const CommonLink = ({
  link,
  children,
  icon,
  fallback,
  fallbackLabel,
  hideLabel,
  ...props
}) => {
  const { label, href, newWindow, valid, validLabel } = useLink(link ?? {});
  const t = useTranslated(link);

  if (!valid && typeof fallback === 'function') {
    const Component = fallback;
    return <Component label={label} />;
  } else if (hideLabel || !validLabel) {
    return (
      <Link href={href} newWindow={newWindow} {...props}>
        {children}
      </Link>
    );
  } else {
    const linkLabel = props.label ?? t('label') ?? fallbackLabel ?? label;
    return (
      <Link href={href} newWindow={newWindow} {...props}>
        {linkLabel} {children} {icon && <span uk-icon={icon} />}
      </Link>
    );
  }
};

export default CommonLink;
