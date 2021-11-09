import { useContact, useAddress } from '@app/hooks';

const OffcanvasNavHeader = () => {
  const [_address, location] = useAddress();
  const contact = useContact();

  const phone = contact('phone');

  return (
    <header className="uk-card-header uk-flex uk-flex-middle">
      <div>
        <a className="uk-link-muted uk-text-bold" href="tel:{phone}">
          {phone}
        </a>
        {location.length > 0 && (
          <div className="uk-text-xsmall uk-text-muted">
            {location.join(' - ')}
          </div>
        )}
      </div>
    </header>
  );
};

export default OffcanvasNavHeader;
