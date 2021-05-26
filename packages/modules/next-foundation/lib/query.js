export * from 'react-query';

export const wrapQuery = fn => {
  return ({ queryKey }) => {
    const [, ...args] = queryKey;
    return fn(...args);
  };
};
