import { getProductAvailability } from '@app/pages/api/rpc';

import { isBlank } from '@foundation/lib/util';

export default async (req, res) => {
  try {
    const info = await getProductAvailability(req.query?.id);
    if (!info.isOrderable) throw new Error('Variant not available');

    const id = info._id;
    const { url } = info;
    const price = isBlank(info.conversions)
      ? info.pricing.price
      : info.conversions;
    const quantity = info.units;

    res.status(200).json({ id, price, url, quantity });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};
