import React from 'react';

import { useConfig } from '@foundation/next';

import { isEqual } from '@foundation/lib/util';

import { useSnipcartSettings } from '@app/hooks/cart';

import currencyConfig from '@app/config/currency';

const defaultCurrency = currencyConfig.default ?? 'EUR';

const Element = ({ publicKey, children }) => {
  return (
    <div
      id="snipcart"
      data-api-key={publicKey}
      data-currency={defaultCurrency}
      data-config-add-product-behavior="none"
      data-config-modal-style="side"
      data-templates-url="/snipcart/templates.html"
      hidden
    >
      {children}
    </div>
  );
};

const SnipcartElement = React.memo(Element, (previous, next) => {
  return isEqual(previous, next);
});

const SnipcartContainer = () => {
  const config = useConfig('shop')('snipcart');

  const publicKey =
    process.env.NEXT_PUBLIC_SNIPCART_API_KEY ?? config.publicKey;

  useSnipcartSettings({
    translationMapping: {
      'address_form.phoneNumber': 'common:address.phoneNumber',
    },
  });

  return <SnipcartElement publicKey={publicKey} />;
};

export default SnipcartContainer;
