import { get, usePropsOrPage, usePageFragments } from '@foundation/next';

import Sections, { Section } from '@shop/components/Page/Sections';

const DefaultLayout = ({ page, children, inheritFragments = 'all' }) => {
  const { content, sections, images, layout } = usePropsOrPage(page);
  const containerProps = get(layout, ['options', 'containerProps'], {});
  const imageOptions = get(layout, ['options', 'images'], {});
  const { header, footer } = usePageFragments(page, inheritFragments);
  return (
    <div
      className="uk-grid-medium uk-child-width-1-1"
      uk-grid="true"
      data-part="layout"
      data-page-type="default"
      {...containerProps}
    >
      <section>
        {header && (
          <Section sectionType="section.fragment" fragment={header} main />
        )}
        <article
          className="uk-card uk-card-default uk-card-body uk-article tm-sections tm-ignore-container"
          data-part="sections"
        >
          <Section
            sectionType="section.images"
            images={images}
            layout="grid"
            limit={6}
            {...imageOptions}
          />
          {content && <Section {...content} main />}
          {children}
          <Sections sections={sections} />
        </article>
        {footer && (
          <Section sectionType="section.fragment" fragment={footer} main />
        )}
      </section>
    </div>
  );
};

export default DefaultLayout;
