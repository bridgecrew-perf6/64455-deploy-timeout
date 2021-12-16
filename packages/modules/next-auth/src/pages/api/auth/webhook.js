import { getClient } from '@atelierfabien/next-sanity/lib/server';
import { webhookHandler } from '../../../lib/handlers';

const handler = webhookHandler(getClient(true));

export default handler;
