import { useMemo } from 'react';
import { times } from '@foundation/next';

export const buildColumns = (number = 1, total = 1, options = {}) => {
  const { property = 'width', at = '@s' } = options;
  const remainder = total % number;
  return times(total, i => {
    if (i + 1 < total) {
      return `uk-${property}-1-${number}${at}`;
    } else if (remainder > 0) {
      return `uk-${property}-${remainder}-${number}${at}`;
    } else {
      return `uk-${property}-1-${number}${at}`;
    }
  });
};

export const useColumns = (items, number = 1, options = {}) => {
  return useMemo(() => {
    if (!Array.isArray(items)) return [];
    const columns = buildColumns(number, items.length, options);
    return items.map((item, i) => {
      const col = columns[i];
      const className = item.className ? `${item.className} ${col}` : col;
      return { ...item, className };
    });
  }, [items, number, options]);
};
