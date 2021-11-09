import {
  PageSeo,
  usePage,
  useSeo,
  useGlobalContext,
  useRouter,
} from '@foundation/next';

import { useCategorySeo } from '@app/hooks/shop';

const CategoryContainerSeo = () => {
  const global = useGlobalContext(true);
  const router = useRouter();
  const page = usePage();
  const category = global.get(['productCategory', router.locale]);
  const categorySeo = useCategorySeo(category ?? page.category);
  const seo = useSeo(categorySeo, {
    useTitleTemplate: true,
    router: { path: '/shop' },
  });
  return <PageSeo {...seo} />;
};

export default CategoryContainerSeo;
