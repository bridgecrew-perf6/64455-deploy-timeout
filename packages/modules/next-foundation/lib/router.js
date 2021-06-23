import { Router, useRouter as useNextRouter } from 'next/router';

import { usePageOptions } from './page';

export { Router };

export function useRouter() {
  const { router: page = {} } = usePageOptions();
  const router = useNextRouter();
  router.page = page;
  return router;
}
