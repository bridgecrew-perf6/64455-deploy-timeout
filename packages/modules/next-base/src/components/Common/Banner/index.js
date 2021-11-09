import { Section } from '@shop/components/Page/Sections';

import { useClosable } from '@app/hooks/preferences';

const mediaLayouts = [
  'mediaLeft',
  'mediaRight',
  'mediaLeftFull',
  'mediaRightFull',
];

const CommonBanner = ({ banner }) => {
  const persistenceKey = `banner-${banner.alias}-${banner._rev}`;
  const mediaLayout = mediaLayouts.includes(banner.layout);
  const closable = useClosable(persistenceKey);

  let className = 'uk-container tm-container-expand';

  if (mediaLayout) className += ' tm-banner-media';

  if (closable) className += ' uk-animation-fade';

  return (
    <Section
      {...banner}
      sectionType="section.block"
      options={{
        closable: banner.floating ? closable : false,
        noPadding: true,
        className,
      }}
    />
  );
};

export default CommonBanner;
