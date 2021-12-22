import { usePropsOrPage, usePageFragments, get } from '@foundation/next';

import { withPageWithLayout } from '@shop/hooks';

import Sections, { Section } from '@shop/components/Page/Sections';
import Regions from '@shop/components/Page/Regions';

const BasicPage = ({ page, children, inheritFragments = 'layout' }) => {
  const { content, sections, images, layout } = usePropsOrPage(page);
  const { header, footer } = usePageFragments(page, inheritFragments);
  const imageOptions = get(layout, ['options', 'images'], {});

  return (
    <>
      {header && (
        <Section sectionType="section.fragment" fragment={header} main />
      )}
      <Section
        sectionType="section.images"
        images={images}
        layout="grid"
        limit={6}
        {...imageOptions}
      />
      {content && !content.hidden && (
        <div
          className="uk-container uk-margin-large-top uk-margin-large-bottom"
          data-part="content"
        >
          <Section {...content} main />
        </div>
      )}
      {children}
      <Sections sections={sections} />
      <Regions page={page} render={['image', 'main', 'body']} />
      {footer && (
        <Section sectionType="section.fragment" fragment={footer} main />
      )}
    </>
  );
};

export default withPageWithLayout('basic', BasicPage);
