import { useMemo } from 'react';
import Head from 'next/head';

import { pick } from 'lodash-es';

import CodeInsertion from '../Code/Insertion';

const types = ['code.js', 'code.css'];

const scriptTypes = ['application/javascript', 'text/javascript'];
const mimeTypes = ['text/css'].concat(scriptTypes);

const HeadAsset = ({ asset, defer }) => {
  if (!asset?.url) return null;
  if (scriptTypes.includes(asset.mimeType)) {
    return (
      <Head key={asset._id}>
        <script src={asset.url} defer={Boolean(defer)} />
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
        memo.push(pick(item, 'asset', 'defer'));
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
      {links.map(({ asset, defer }) => (
        <HeadAsset key={asset._id} asset={asset} defer={defer} />
      ))}
    </>
  );
};

export default HeadAssets;
