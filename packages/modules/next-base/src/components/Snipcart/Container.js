import { useEffect } from 'react';

import { useConfig } from '@foundation/next';

import { useSnipcartSettings } from '@app/hooks/cart';

import currencyConfig from '@app/config/currency';

const defaultCurrency = currencyConfig.default ?? 'EUR';

const SnipcartContainer = () => {
  const config = useConfig('shop')('snipcart');

  const publicKey =
    process.env.NEXT_PUBLIC_SNIPCART_API_KEY ?? config.publicKey;

  const version = config.version ?? '3.3.0';

  useSnipcartSettings({
    translationMapping: {
      'address_form.phoneNumber': 'common:address.phoneNumber',
    },
  });

  useEffect(() => {
    let elem = document.getElementById('snipcart');

    if (!elem && publicKey) {
      elem = document.createElement('div');
      elem.id = 'snipcart';
      elem.hidden = true;
      elem.setAttribute('data-api-key', publicKey);
      elem.setAttribute('data-currency', defaultCurrency);
      elem.setAttribute('data-config-add-product-behavior', 'none');
      elem.setAttribute('data-config-modal-style', 'side');
      elem.setAttribute('data-templates-url', '/snipcart/templates.html');
      document.body.appendChild(elem);
    }

    let script = document.getElementById('snipcart-script');

    if (!script && publicKey) {
      script = document.createElement('script');
      script.id = 'snipcart-script';
      script.src = `https://cdn.snipcart.com/themes/v${version}/default/snipcart.js`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [publicKey, version]);

  return null;
};

export default SnipcartContainer;
