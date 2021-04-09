import { useTranslation, useSettings } from '@mono/next';
import { useGoogleAnalytics } from '@mono/next';

export default function Home() {
  const { t, lang } = useTranslation();
  const { enabled: gaEnabled } = useGoogleAnalytics();
  const { settings } = useSettings();

  function onClick(e) {
    settings.toggle('analytics', { on: true, off: null });
  }

  return (
    <div className="uk-container uk-margin-medium-top">
      <h1 className="uk-flex uk-flex-between uk-flex-middle uk-heading-medium uk-margin-large-bottom">
        <span>{t(`common:languages.${lang}`)}</span>
        {gaEnabled && <button className="uk-button uk-button-default" onClick={onClick}>Toggle Consent</button>}
      </h1>
      <div className="uk-column-1-2@m space-y-4 uk-margin-bottom">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
      </div>
      <div className="uk-column-1-2@m space-y-4 uk-margin-bottom">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
      </div>
    </div>
  );
}
