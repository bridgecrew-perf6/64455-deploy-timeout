/* eslint-disable no-unused-expressions */

import { useEventListener } from '@foundation/next';

const message =
  '<span class="uk-margin-small-right" uk-icon=\'check\'></span>Added to ';

const links = {
  favorites: '<a href="/account/favorites">favorites</a>',
  compare: '<a href="/compare">compare</a>',
};

function addTo(el) {
  let link;

  if (el.classList.contains('js-add-to-favorites')) {
    link = links.favorites;
  }

  if (el.classList.contains('js-add-to-compare')) {
    link = links.compare;
  }

  UIkit.notification({
    message: message + link,
    pos: 'bottom-right',
  });

  el.classList.toggle('tm-action-button-active');
  el.classList.toggle('js-added-to');
}

export default function Scripts() {
  useEventListener('show', '.js-product-switcher', (e, target) => {
    window?.UIkit?.update(target);
  });

  useEventListener('click', '.js-add-to-cart', () => {
    window?.UIkit?.offcanvas('#cart-offcanvas').show();
  });

  useEventListener('click', '.js-add-to', (e, el) => {
    addTo(el);
  });

  return null;
}
