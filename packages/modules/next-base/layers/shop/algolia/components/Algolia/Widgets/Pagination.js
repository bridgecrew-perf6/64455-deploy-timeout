import { useCallback } from 'react';

import { connectPagination } from 'react-instantsearch-dom';

import { Link } from '@foundation/next';

import { usePagination } from '@app/hooks/pagination';

export const scrollTopOfPage = options => {
  const opts = typeof options === 'object' ? options : {};
  if (window.UIkit) {
    UIkit.util.scrollIntoView(opts.el ?? document.body, opts);
  } else {
    window.scrollTo(0, opts.offset ?? 0);
  }
};

const PaginationItem = ({
  target,
  label,
  value,
  selected,
  disabled,
  mapped,
  nbPages,
  refine,
  createURL,
  scrollToTop,
}) => {
  const className =
    nbPages > 1
      ? selected
        ? 'uk-active'
        : disabled
        ? target === 'ellipsis'
          ? 'uk-disabled'
          : 'uk-invisible'
        : null
      : 'uk-invisible';

  const props = {};

  if (mapped) props[`uk-pagination-${target}`] = String(mapped);

  const onClick = useCallback(
    e => {
      e.preventDefault();
      if (!disabled) {
        refine(value);
        if (scrollToTop) scrollTopOfPage(scrollToTop);
      }
    },
    [disabled, refine, scrollToTop, value]
  );

  if (disabled) {
    return (
      <a href="#" className={className}>
        <span {...props}>{mapped ? null : label}</span>
      </a>
    );
  } else {
    return (
      <Link href={createURL(value)} className={className} onClick={onClick}>
        <span {...props}>{mapped ? null : label}</span>
      </Link>
    );
  }
};

const Pagination = props => {
  const {
    currentRefinement,
    nbPages,
    refine,
    createURL,
    scrollToTop,
    options = {},
  } = props;

  const items = usePagination(currentRefinement, nbPages, {
    ellipsis: true,
    ...options,
  });

  return (
    <ul className="uk-pagination uk-flex-center uk-flex-middle">
      {items.map(item => (
        <li key={item.key} data-pagination={item.type} data-group={item.group}>
          <PaginationItem
            {...item}
            target={item.key}
            nbPages={nbPages}
            refine={refine}
            createURL={createURL}
            scrollToTop={scrollToTop}
          />
        </li>
      ))}
    </ul>
  );
};

export default connectPagination(Pagination);
