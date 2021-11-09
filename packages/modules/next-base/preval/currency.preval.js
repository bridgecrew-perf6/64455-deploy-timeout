import preval from 'next-plugin-preval';

import { fetchCurrencies } from '@app/sanity/server';

export default preval(fetchCurrencies());
