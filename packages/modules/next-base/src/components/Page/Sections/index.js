import Section from '@shop/components/Page/Sections/Section';

import TextSection from '@shop/components/Page/Sections/Text';
import ImageSection from '@shop/components/Page/Sections/Image';
import ImagesSection from '@shop/components/Page/Sections/Images';
import CollectionSection from '@shop/components/Page/Sections/Collection';
import ListSection from '@shop/components/Page/Sections/List';
import GroupSection from '@shop/components/Page/Sections/Group';
import TableSection from '@shop/components/Page/Sections/Table';
import DividerSection from '@shop/components/Page/Sections/Divider';
import BlockSection from '@shop/components/Page/Sections/Block';
import FragmentSection from '@shop/components/Page/Sections/Fragment';
import ComponentSection from '@shop/components/Page/Sections/Component';

export {
  Section,
  TextSection,
  ImageSection,
  ImagesSection,
  CollectionSection,
  ListSection,
  GroupSection,
  TableSection,
  DividerSection,
  BlockSection,
  FragmentSection,
  ComponentSection,
};

export const sections = new Map();

sections.set('section.text', TextSection);
sections.set('section.image', ImageSection);
sections.set('section.images', ImagesSection);
sections.set('section.block', BlockSection);
sections.set('section.cta', BlockSection);
sections.set('section.collection', CollectionSection);
sections.set('section.list', ListSection);
sections.set('section.group', GroupSection);
sections.set('section.table', TableSection);
sections.set('section.divider', DividerSection);
sections.set('section.fragment', FragmentSection);
sections.set('section.component', ComponentSection);

const Sections = ({ sections, nested }) => {
  if (Array.isArray(sections) && sections.length > 0) {
    return (
      <>
        {sections.map(section => (
          <Section key={section._key} {...section} nested={nested} />
        ))}
      </>
    );
  } else {
    return null;
  }
};

export default Sections;
