import BlockContent from '@sanity/block-content-to-react';

const BlockRenderer = props => {
  return BlockContent.defaultSerializers.types.block(props);
};

const types = {};

types['block.basic'] = BlockRenderer;
types['block.content'] = BlockRenderer;

export default { types };
