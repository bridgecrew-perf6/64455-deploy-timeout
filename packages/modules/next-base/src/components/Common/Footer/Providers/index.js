import PaymentIcon from '@shop/components/Icons/Payment';

import { useTranslated } from '@foundation/next';

import lexicons from '@app/config/lexicons';

const providers = lexicons.paymentProviders ?? {};
const providerEntries = providers.entries ?? [];

const CommonFooterProviders = () => {
  const translations = useTranslated(providers.lookup);
  return (
    <div className="tm-payment-icons">
      {providerEntries.map(type => (
        <PaymentIcon
          key={type}
          type={type}
          label={translations([type, 'label'])}
        />
      ))}
    </div>
  );
};

export default CommonFooterProviders;
