import { handleSnipcartUpdate } from '@app/sanity/server';

export default async (req, res) => {
  try {
    const token = req.headers['x-snipcart-requesttoken'] ?? '';
    const ids = await handleSnipcartUpdate(token, req.body);
    res.status(200).json({ ok: true, ids });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e.message);
    res.status(500).json({ error: 'invalid request', ids: [] });
  }
};
