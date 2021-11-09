import preval from 'next-plugin-preval';

import { fetchLexiconsTranslations } from '@app/sanity/server';

export default preval(fetchLexiconsTranslations());
