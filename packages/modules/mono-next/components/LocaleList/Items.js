import { useCallback } from 'react';
import { useLocale } from '../../lib/site';
import { useSettings } from '../../lib/settings';

export default function LocaleListItems({ activeClassName }) {
  const { locales } = useLocale();
  const { setLocale } = useSettings();

  if (locales.length === 0) return null; // skip

  activeClassName = activeClassName ?? 'uk-active';

  const onClick = useCallback((e) => {
    e.preventDefault();
    setLocale(e.target.dataset.code);
  }, [setLocale]);

  return (<>
    { locales.map(({ code, active, name, href }) => (
      <li key={code} className={ active ? activeClassName : '' }>
        <a href={href} data-code={code} hrefLang={code} onClick={onClick}>{name}</a>
      </li>
    )) }
  </>);
}