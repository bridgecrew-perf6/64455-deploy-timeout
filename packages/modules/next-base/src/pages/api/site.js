import { inDevelopment, fetchSettings } from '@app/sanity/server';

export default inDevelopment(async (req, res) => {
  const data = await fetchSettings();
  res.setHeader(
    'Cache-Control',
    'max-age=60, s-maxage=60, stale-while-revalidate'
  );
  res.status(200).json(data ?? {});
});
