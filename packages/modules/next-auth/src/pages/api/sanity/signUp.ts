import { signUpHandler } from '@atelierfabien/next-auth';

import { getClient } from '@atelierfabien/next-sanity/lib/server';

const client = getClient(true);

export default signUpHandler(client);
