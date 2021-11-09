import { useTranslation } from '@foundation/next';
import { useOpeningHours } from '@app/hooks';

const OpeningHours = ({ header }) => {
  const { t } = useTranslation();
  const openingHours = useOpeningHours();

  return (
    <div>
      {header && (
        <h4 className="uk-text-muted uk-text-small uk-text-uppercase">
          {t('app:openingHours')}
        </h4>
      )}
      <ul className="uk-list uk-text-muted uk-text-small">
        {openingHours.map(({ name, times }) => (
          <li key={name}>
            <div className="uk-grid-small" uk-grid="true">
              <div className="uk-width-expand" uk-leader="true">
                {name}
              </div>
              <div>{times.join(' & ')}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OpeningHours;
