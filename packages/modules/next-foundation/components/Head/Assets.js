import { useMemo } from 'react';
import Head from 'next/head';

import CodeInsertion from '../Code/Insertion';

const types = ['code.js', 'code.css'];

const scriptTypes = ['application/javascript', 'text/javascript'];
const mimeTypes = ['text/css'].concat(scriptTypes);

const HeadAsset = ({ asset }) => {
  if (!asset?.url) return null;
  if (scriptTypes.includes(asset.mimeType)) {
    return (
      <Head key={asset._id}>
        <script src={asset.url} />
      </Head>
    );
  } else if (asset.mimeType === 'text/css') {
    return (
      <Head key={asset._id}>
        <link href={asset.url} rel="stylesheet" />
      </Head>
    );
  } else {
    return null;
  }
};

const HeadAssets = ({ assets = [] }) => {
  if (!Array.isArray(assets)) assets = [];

  const [inline, links] = useMemo(() => {
    const inline = assets.reduce((memo, item) => {
      if (types.includes(item._type)) memo.push(item);
      return memo;
    }, []);
    const links = assets.reduce((memo, item) => {
      if (item._type === 'asset' && mimeTypes.includes(item.asset?.mimeType)) {
        memo.push(item.asset);
      }
      return memo;
    }, []);
    return [inline, links];
  }, [assets]);

  return (
    <>
      {inline.map(item => (
        <CodeInsertion key={item._key} source={item.source} />
      ))}
      {links.map(item => (
        <HeadAsset key={item._id} asset={item} />
      ))}
    </>
  );
};

export default HeadAssets;
