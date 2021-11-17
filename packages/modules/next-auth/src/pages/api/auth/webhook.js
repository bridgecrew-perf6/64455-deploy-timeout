import { webhookHandler } from '@atelierfabien/next-auth';

import { getClient } from '@atelierfabien/next-sanity/lib/server';

const handler = webhookHandler(getClient(true));

export default handler;
