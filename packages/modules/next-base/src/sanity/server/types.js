import { getClient } from '@atelierfabien/next-sanity/lib/server';

import init from '@app/sanity/types';

const client = init(getClient());

export default client;
