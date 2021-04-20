import { PageSeo } from '../../lib';

const Page = ({ children, ...seo }) => {
  return (
    <>
      <PageSeo {...seo} />
      {children}
    </>
  );
};

export default Page;
