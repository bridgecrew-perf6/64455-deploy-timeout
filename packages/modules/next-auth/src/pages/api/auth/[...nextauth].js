import { NextAuth } from '@atelierfabien/next-auth';

import config from '@app/config/auth';

export default (req, res) => NextAuth(req, res, config);
