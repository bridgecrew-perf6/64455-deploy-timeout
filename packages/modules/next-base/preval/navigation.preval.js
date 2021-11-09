import preval from 'next-plugin-preval';

import { fetchNavigation } from '@app/sanity/server';

export default preval(fetchNavigation());
