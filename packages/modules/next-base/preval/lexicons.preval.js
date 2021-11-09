import preval from 'next-plugin-preval';

import { fetchLookupLexicons } from '@app/sanity/server';

export default preval(fetchLookupLexicons());
