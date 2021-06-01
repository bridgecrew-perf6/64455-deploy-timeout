import { useCallback } from 'react';
import { useLocale, useSettings } from '../../lib';

export default function LocaleSelect({ className, withCode }) {
  const { locale, locales, lang, language } = useLocale();
  const { setLocale } = useSettings();

  const onChange = useCallback(
    e => {
      e.preventDefault();
      setLocale(e.target.value);
    },
    [setLocale]
  );

  return (
    <div className={className} uk-form-custom="target: false">
      <select value={locale} onChange={onChange}>
        {locales.map(({ code, name }) => (
          <option key={code} value={code}>
            {withCode && `${String(code).toUpperCase()} - `} {name}
          </option>
        ))}
      </select>
      <span>{String(lang).toUpperCase()}</span>
    </div>
  );
}
