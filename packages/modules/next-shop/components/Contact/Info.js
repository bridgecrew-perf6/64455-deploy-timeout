import ContactStore from '@shop/components/Contact/Store';
import ContactEmail from '@shop/components/Contact/Email';
import ContactForm from '@shop/components/Contact/Form';

const ContactInfo = () => (
  <div
    className="uk-child-width-1-1 uk-child-width-1-2@s uk-margin-top"
    uk-grid="true"
  >
    <ContactStore />
    <ContactEmail />
    <ContactForm />
  </div>
);

export default ContactInfo;
