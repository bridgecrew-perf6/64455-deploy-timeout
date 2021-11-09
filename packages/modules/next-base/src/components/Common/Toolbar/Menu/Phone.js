import { useContact } from '@app/hooks';

const CommonToolbarMenuPhone = () => {
  const contact = useContact();
  const phone = contact('phone');
  if (phone) {
    return (
      <li>
        <a href={`tel:${phone}`}>
          <span
            className="uk-margin-xsmall-right"
            uk-icon="icon: receiver; ratio: .75;"
          />
          <span className="tm-pseudo">{phone}</span>
        </a>
      </li>
    );
  } else {
    return null;
  }
};

export default CommonToolbarMenuPhone;
