import { useContact, useAddress } from '@app/hooks';

import Social from '@shop/components/Common/Social';

const CommonFooterAddress = ({ icons }) => {
  const [address, location] = useAddress();
  const contact = useContact();

  const phone = contact('phone');
  const email = contact('email');

  if (!phone && !email && location.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="uk-text-muted uk-text-small uk-text-uppercase">
        {address('name')}
      </h4>
      <ul className="uk-list uk-text-small">
        {location.length > 0 && (
          <li>
            <div className="uk-text-muted">
              {icons && (
                <span className="uk-margin-small-right" uk-icon="location" />
              )}
              <span>{location.join(' - ')}</span>
            </div>
          </li>
        )}
        {phone && (
          <li>
            <a className="uk-link-muted" href={`tel:${phone}`}>
              {icons && (
                <span className="uk-margin-small-right" uk-icon="receiver" />
              )}
              <span className="tm-pseudo">{phone}</span>
            </a>
          </li>
        )}
        {email && (
          <li>
            <a className="uk-link-muted" href={`mailto:${email}`}>
              {icons && (
                <span className="uk-margin-small-right" uk-icon="mail" />
              )}
              <span className="tm-pseudo">{email}</span>
            </a>
          </li>
        )}
      </ul>
      <Social />
    </div>
  );
};

export default CommonFooterAddress;
