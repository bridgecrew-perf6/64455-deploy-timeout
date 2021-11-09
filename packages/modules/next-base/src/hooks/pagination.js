import { useMemo } from 'react';

import { useTranslation } from '@foundation/next';

const paginationMapping = {
  previous: true,
  next: true,
};

export function usePagination(currentPage = 1, nbPages = 1, options = {}) {
  const { t } = useTranslation();

  return useMemo(() => {
    const {
      showFirst = false,
      showPrevious = true,
      showNext = true,
      showLast = false,
      ellipsis = false,
      padding = 3,
      totalPages = Infinity,
      mapping = paginationMapping,
    } = options;

    const maxPages = Math.min(nbPages, totalPages);
    const lastPage = maxPages;

    const pages = getPages(currentPage, maxPages, padding);

    let items = [];
    if (showFirst) {
      items.push({
        key: 'first',
        type: 'first',
        label: t('common:pagination.first'),
        value: 1,
        disabled: currentPage === 1,
        mapped: mapping.first,
        group: showPrevious ? null : 'back',
      });
    }

    if (showPrevious) {
      items.push({
        key: 'previous',
        type: 'previous',
        label: t('common:pagination.previous'),
        value: currentPage - 1,
        disabled: currentPage === 1,
        mapped: mapping.previous,
        group: 'back',
      });
    }

    items = items.concat(
      pages.map(value => ({
        key: value,
        type: 'page',
        label: value,
        value,
        selected: value === currentPage,
        mapped: mapping[value],
        group: 'pages',
      }))
    );

    if (ellipsis && maxPages > pages.length) {
      items.push({
        key: 'ellipsis',
        type: 'ellipsis',
        label: typeof ellipsis === 'string' ? ellipsis : '...',
        disabled: true,
        mapped: mapping.ellipsis,
        group: 'pages',
      });
    }

    if (showNext) {
      items.push({
        key: 'next',
        type: 'next',
        label: t('common:pagination.next'),
        value: currentPage + 1,
        disabled: currentPage === lastPage || lastPage <= 1,
        mapped: mapping.next,
        group: 'forward',
      });
    }

    if (showLast) {
      items.push({
        key: 'last',
        type: 'last',
        label: t('common:pagination.last'),
        value: lastPage,
        disabled: currentPage === lastPage || lastPage <= 1,
        mapped: mapping.last,
        group: showNext ? null : 'forward',
      });
    }

    return items;
  }, [currentPage, nbPages, options, t]);
}

export function range({ start = 0, end, step = 1 }) {
  // We can't divide by 0 so we re-assign the step to 1 if it happens.
  const limitStep = step === 0 ? 1 : step;

  // In some cases the array to create has a decimal length.
  // We therefore need to round the value.
  // Example:
  //   { start: 1, end: 5000, step: 500 }
  //   => Array length = (5000 - 1) / 500 = 9.998
  const arrayLength = Math.round((end - start) / limitStep);

  return [...Array(arrayLength)].map(
    (_, current) => (start + current) * limitStep
  );
}

// Determines the size of the widget (the number of pages displayed - that the user can directly click on)
function calculateSize(padding, maxPages) {
  return Math.min(2 * padding + 1, maxPages);
}

function calculatePaddingLeft(currentPage, padding, maxPages, size) {
  if (currentPage <= padding) {
    return currentPage;
  }

  if (currentPage >= maxPages - padding) {
    return size - (maxPages - currentPage);
  }

  return padding + 1;
}

// Retrieve the correct page range to populate the widget
function getPages(currentPage, maxPages, padding) {
  const size = calculateSize(padding, maxPages);
  // If the widget size is equal to the max number of pages, return the entire page range
  if (size === maxPages) return range({ start: 1, end: maxPages + 1 });

  const paddingLeft = calculatePaddingLeft(
    currentPage,
    padding,
    maxPages,
    size
  );
  const paddingRight = size - paddingLeft;

  const first = currentPage - paddingLeft;
  const last = currentPage + paddingRight;
  return range({ start: first + 1, end: last + 1 });
}
