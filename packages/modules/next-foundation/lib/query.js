export * from 'react-query';

export const wrapQuery = (fn, offset = false) => {
  return ({ queryKey }) => {
    const args = queryKey.slice(
      typeof offset === 'number' ? offset : offset === true ? 1 : 0
    );
    return fn(...args);
  };
};
