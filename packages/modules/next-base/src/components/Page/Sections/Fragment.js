import { useMemo } from 'react';
import { get, pick, mergeObjects } from '@foundation/next';

import CodeInsertion from '@foundation/components/Code/Insertion';

import Sections from '@shop/components/Page/Sections';
import Section from '@shop/components/Page/Sections/Section';
import PageImage from '@shop/components/Page/Parts/Image';

import components from '@shop/components/Page/Components';

import colors from '@shop/config/colors';

const Wrapper = ({ children }) => <>{children}</>;

const properties = ['component', 'layout', 'columns', 'style', 'color'];

// NOTE use named function instead of const declaration here

export default function FragmentSection(section) {
  const { _type, fragment, main } = section;

  const { _id, content, sections, images, code, alias, nested } = fragment;

  const mergedOptions = mergeObjects(fragment.options, section.options);

  const merged = mergeObjects(
    pick(fragment, properties),
    pick(section, properties)
  );

  const hidden = Boolean(section.hidden || fragment.hidden);

  const { component, style } = merged;

  let color = colors.includes(merged.color) ? merged.color : 'none';

  let sectionClass =
    !nested && style !== 'framed'
      ? 'tm-expand'
      : color !== 'none'
      ? 'tm-frame'
      : 'tm-none';

  if (style === 'narrow') sectionClass = 'tm-narrow';
  if (style === 'wide') sectionClass = 'tm-wide';
  if (color !== 'none' && style !== 'wide') sectionClass += ' uk-padding';

  const foreground =
    color === 'none'
      ? ''
      : color === 'muted' || color === 'default'
      ? 'uk-dark'
      : 'uk-light';

  merged.color = color;
  merged.foreground = foreground;

  const codeSnippets = Array.isArray(code) ? code : [];
  const imageOptions = get(mergedOptions, ['images'], {});
  const customClassName = get(mergedOptions, 'className');
  const card = style === 'card' || style === 'cardPadding';

  let className = section.className ?? '';

  if (customClassName) {
    className = customClassName;
  } else if (card) {
    className += ' uk-card uk-card-default uk-overflow-hidden uk-margin';
    if (style === 'cardPadding') className += ' uk-card-body';
  } else if (main) {
    className += ' uk-margin';
  }

  const Component = useMemo(() => {
    return components[component] ?? components.FragmentSection ?? Wrapper;
  }, [component]);

  if (hidden) {
    return null;
  } else {
    return (
      <section
        className={`tm-section uk-section-${color} ${foreground} ${className} ${sectionClass}`}
        data-section={_type}
        data-fragment={alias?.current}
      >
        <Component item={fragment} {...merged}>
          <PageImage
            images={images}
            layout="grid"
            limit={6}
            {...imageOptions}
          />
          {content && <Section {...content} />}
          <Sections sections={sections} nested={nested} />
          {codeSnippets.map(code => (
            <CodeInsertion
              key={code._key}
              id={`${_id}-${code._key}`}
              source={code.source}
            />
          ))}
        </Component>
      </section>
    );
  }
}
