import { usePropsOrPage, usePageFragments, get } from '@foundation/next';

import Sections, { Section } from '@shop/components/Page/Sections';
import Regions from '@shop/components/Page/Regions';

const BasicLayout = ({ page, children, inheritFragments = 'layout' }) => {
  const { content, sections, images, layout } = usePropsOrPage(page);
  const { header, footer } = usePageFragments(page, inheritFragments);
  const containerProps = get(layout, ['options', 'containerProps'], {});
  const imageOptions = get(layout, ['options', 'images'], {});

  return (
    <section
      data-part="layout"
      data-page-type="basic"
      {...containerProps}
      uk-height-viewport="expand: true"
    >
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
      <div
        className="uk-margin-medium-top uk-margin-medium-bottom"
        data-part="sections"
      >
        <Sections sections={sections} />
        <Regions page={page} render={['image', 'main', 'body']} />
      </div>
      {footer && (
        <Section sectionType="section.fragment" fragment={footer} main />
      )}
    </section>
  );
};

export default BasicLayout;
