import preval from 'next-plugin-preval';

import { fetchSettings } from '@app/sanity/server';

export default preval(fetchSettings());
