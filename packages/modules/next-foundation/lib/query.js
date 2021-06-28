export * from 'react-query';

export const wrapQuery = (fn, offset = false) => {
  return ({ queryKey }) => {
    const args = Array.isArray(queryKey)
      ? queryKey.slice(
          typeof offset === 'number' ? offset : offset === true ? 1 : 0
        )
      : queryKey
      ? [queryKey]
      : [];
    return fn(...args);
  };
};
