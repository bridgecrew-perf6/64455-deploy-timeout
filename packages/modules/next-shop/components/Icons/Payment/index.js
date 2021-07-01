import { default as Alipay } from './Alipay';
import { default as AmericanExpress } from './AmericanExpress';
import { default as ApplePay } from './ApplePay';
import { default as Bitcoin } from './Bitcoin';
import { default as DinersClub } from './DinersClub';
import { default as Ethereum } from './Ethereum';
import { default as Girocard } from './Girocard';
import { default as Giropay } from './Giropay';
import { default as GooglePay } from './GooglePay';
import { default as Ideal } from './Ideal';
import { default as Klarna } from './Klarna';
import { default as Maestro } from './Maestro';
import { default as Mastercard } from './Mastercard';
import { default as Paypal } from './Paypal';
import { default as Przelewy24 } from './Przelewy24';
import { default as Ripple } from './Ripple';
import { default as Visa } from './Visa';
import { default as Vpay } from './Vpay';

export {
  Alipay,
  AmericanExpress,
  ApplePay,
  Bitcoin,
  DinersClub,
  Ethereum,
  Girocard,
  Giropay,
  GooglePay,
  Ideal,
  Klarna,
  Maestro,
  Mastercard,
  Paypal,
  Przelewy24,
  Ripple,
  Visa,
  Vpay,
};

const icons = {
  alipay: Alipay,
  americanExpress: AmericanExpress,
  applePay: ApplePay,
  bitcoin: Bitcoin,
  dinersClub: DinersClub,
  ethereum: Ethereum,
  girocard: Girocard,
  girocard: Giropay,
  googlePay: GooglePay,
  ideal: Ideal,
  klarna: Klarna,
  maestro: Maestro,
  mastercard: Mastercard,
  paypal: Paypal,
  przelewy24: Przelewy24,
  ripple: Ripple,
  visa: Visa,
  vpay: Vpay,
};

const PaymentIcon = ({ type, label, ...props }) => {
  const Icon = icons[type];
  return Icon ? (
    <div data-payment-type={type}>
      <div className="tm-payment-type-label">{label}</div>
      <Icon {...props} />
    </div>
  ) : null;
};

export default PaymentIcon;
