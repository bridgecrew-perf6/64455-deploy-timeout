import { Section } from '@shop/components/Page/Sections';

const BlockText = ({ className, ...props }) => {
  return (
    <div className={className}>
      <Section {...props} sectionType="section.text" />
    </div>
  );
};

export default BlockText;
