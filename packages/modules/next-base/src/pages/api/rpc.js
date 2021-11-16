// NOTE this requires a special export to work with RPC

import * as rpc from '@app/lib/rpc';

export const config = { rpc: true };

export async function getHomepage(...args) {
  return rpc.getHomepage(...args);
}

export async function getCollection(...args) {
  return rpc.getCollection(...args);
}

export async function getCategory(...args) {
  return rpc.getCategory(...args);
}

export async function getProductAvailability(...args) {
  return rpc.getProductAvailability(...args);
}
