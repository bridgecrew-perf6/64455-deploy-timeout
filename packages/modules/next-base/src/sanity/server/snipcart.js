import axios from 'axios';

import { getClient } from '@atelierfabien/next-sanity/lib/server';

import { get } from '@atelierfabien/next-foundation/server';

import { inventoryQuery } from '@app/sanity/queries';

import { handleUpdate } from '@app/config/snipcart';

const { SNIPCART_SECRET_KEY } = process.env;

const client = getClient(true); // with token

const requireValidation = process.env.NODE_ENV !== 'development';

const events = {
  'order.completed': handleOrderCompleted,
  'order.status.changed': handleOrderChanged,
};

export async function validateSnipcartToken(token) {
  const url = `https://app.snipcart.com/api/requestvalidation/${token}`;
  try {
    const response = await axios.get(url, {
      auth: {
        username: SNIPCART_SECRET_KEY,
        password: '',
      },
    });
    return token === get(response, ['data', 'token'], '');
  } catch (e) {
    return false;
  }
}

export async function handleSnipcartUpdate(
  token,
  payload,
  verifyToken = requireValidation
) {
  const eventName = get(payload, ['eventName']);
  const valid = verifyToken ? await validateSnipcartToken(token) : true;
  const handler = events[eventName];

  const proceed = valid && (await handleUpdate(eventName, payload, handler));

  if (typeof handler !== 'function') {
    return []; // skip
  } else if (proceed) {
    return handler(payload);
  } else {
    throw new Error('Invalid Snipcart token');
  }
}

export async function handleOrderCompleted(payload) {
  const items = get(payload, ['content', 'items'], []);
  return updateInventory(items, processOutbound);
}

export async function handleOrderChanged(payload) {
  if (payload?.to?.toLowerCase() === 'cancelled') {
    const items = get(payload, ['content', 'items'], []);
    return updateInventory(items, processInbound);
  } else {
    return [];
  }
}

export async function updateInventory(items, processItem) {
  const transaction = await processItems(items, processItem);
  const result = await transaction.commit();
  return result.documentIds ?? [];
}

async function processItems(items, processItem) {
  const transaction = client.transaction();
  return items.reduce((promise, item) => {
    return promise.then(() => {
      return client.fetch(inventoryQuery, { id: item.id }).then((docs) => {
        return docs.reduce(
          (tx, doc) => processItem(doc, item, tx),
          transaction
        );
      });
    });
  }, Promise.resolve());
}

// Inbound: an item has been added (back) to the inventory,
// unless it was an out-of-stock-purchase at the time

export function processInbound(doc, item, transaction) {
  const outOfStockPurchase = isOutOfStockPurchase(item);
  const target = doc.variant ?? doc.master;
  if (target?.id === item.id && !outOfStockPurchase) {
    const tx = processInventoryUpdate('inc', doc, item, transaction);
    return updateStats('inc', doc, item, tx);
  } else if (target?.id === item.id) {
    return updateStats('inc', doc, item, transaction);
  } else {
    return transaction;
  }
}

// Outbound: an item has been removed from the inventory,
// unless it was an out-of-stock-purchase at the time

export function processOutbound(doc, item, transaction) {
  const outOfStockPurchase = isOutOfStockPurchase(item);
  const target = doc.variant ?? doc.master;
  if (target?.id === item.id && !outOfStockPurchase) {
    const tx = processInventoryUpdate('dec', doc, item, transaction);
    return updateStats('dec', doc, item, tx);
  } else if (target?.id === item.id) {
    return updateStats('dec', doc, item, transaction);
  } else {
    return transaction;
  }
}

// Helpers

function processInventoryUpdate(method, doc, item, transaction) {
  const target = doc.variant ?? doc.master;
  if (target?.id === item.id) {
    if (target._type === 'product.master') {
      // Update master unit count
      return transaction
        .patch(doc._id, (p) =>
          patchInventory(p, method, 'master.units', item.quantity)
        )
        .patch(doc._id, (p) => p.set({ '..[units < 0].units': 0 }));
    } else if (target._type === 'product.variant') {
      // Update variant unit count, if variant
      return transaction
        .patch(doc._id, (p) =>
          patchInventory(
            p,
            method,
            `variants[id == "${target.id}"].units`,
            item.quantity
          )
        )
        .patch(doc._id, (p) => p.set({ 'variants[units < 0].units': 0 }));
    }
  } else {
    return transaction;
  }
}

function updateStats(method, doc, item, transaction) {
  const target = doc.variant ?? doc.master;
  if (target?.id === item.id && method === 'dec') {
    // outbound inventory should decrease, but sold count should increase
    return transaction.patch(doc._id, (p) =>
      patchInventory(p, 'inc', 'stats.sold', item.quantity)
    );
  } else {
    return transaction;
  }
}

function patchInventory(p, method, key, quantity) {
  const pp = p.setIfMissing({ [key]: 0 });
  if (method === 'inc') {
    return pp.inc({ [key]: quantity });
  } else if (method === 'dec') {
    return pp.dec({ [key]: quantity });
  } else {
    return pp;
  }
}

function isOutOfStockPurchase(item) {
  return get(item, ['metadata', 'outOfStockPurchase'], false);
}
