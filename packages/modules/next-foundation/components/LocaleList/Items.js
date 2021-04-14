import { useCallback } from 'react';
import { useLocale, useSettings } from '../../lib';

export default function LocaleListItems({ activeClassName }) {
  const { locales } = useLocale();
  const { setLocale } = useSettings();

  const className = activeClassName ?? 'uk-active';

  const onClick = useCallback(
    e => {
      e.preventDefault();
      setLocale(e.target.dataset.code);
    },
    [setLocale]
  );

  if (locales.length === 0) return null; // skip

  return (
    <>
      {locales.map(({ code, active, name, href }) => (
        <li key={code} className={active ? className : ''}>
          <a href={href} data-code={code} hrefLang={code} onClick={onClick}>
            {name}
          </a>
        </li>
      ))}
    </>
  );
}
