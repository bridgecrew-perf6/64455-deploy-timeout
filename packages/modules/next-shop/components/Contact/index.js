import CommonMap from '@shop/components/Common/Map';
import ContactInfo from '@shop/components/Contact/Info';

const ContactPage = () => (
  <article className="uk-card uk-card-default uk-card-small uk-card-body uk-article tm-ignore-container">
    <div className="tm-wrapper">
      <CommonMap className="tm-ratio tm-ratio-16-9" />
    </div>
    <ContactInfo />
  </article>
);

export default ContactPage;
