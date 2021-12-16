import { isBlank } from '@atelierfabien/next-foundation/lib/util';

import { getClient } from '@atelierfabien/next-sanity/lib/server';
import { signUpHandler } from '../../../lib/handlers';

const client = getClient(true);

const handler = signUpHandler(client);

export default (req, res) => {
  const { email = '', password = '' } = req.body;
  if (isBlank(email) || isBlank(password) || password.match(/\S{8}/)) {
    res.json({ error: 'Invalid input' });
  } else {
    return handler(req, res);
  }
};
