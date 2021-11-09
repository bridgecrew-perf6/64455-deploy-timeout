import { get } from '@foundation/next';

import Wrapper from '@shop/components/Page/Parts/Sidebar/Wrapper';

import { Section } from '@shop/components/Page/Sections';

const SidebarFragment = ({
  fragment,
  section,
  layout,
  dividers = false,
  titles = false,
}) => {
  if (typeof fragment === 'object' && !fragment.hidden) {
    const title = get(fragment, ['content', 'title']);
    return (
      <Wrapper section={section} layout={layout} dividers={dividers}>
        {titles && title && <h4>{title}</h4>}
        <Section fragment={fragment} sectionType="section.fragment" />
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default SidebarFragment;
