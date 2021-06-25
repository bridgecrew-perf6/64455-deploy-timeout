import React, { useMemo, useContext, useState } from 'react';
import { wrapStateObject } from './util';

export const GlobalContext = React.createContext();

export const GlobalContextProvider = ({ children, initial = {} }) => {
  const [state, setState] = useState(initial);
  const context = useMemo(() => {
    return wrapStateObject(state, setState);
  }, [state]);
  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export function useGlobalContext(data) {
  const context = useContext(GlobalContext);

  if (data !== true && typeof context !== 'object') return {};

  if (data === true) {
    return context;
  } else if (typeof data === 'function') {
    data(context);
  } else if (typeof data === 'object') {
    context.setData(state => ({ ...state, ...data }));
  }

  return context.data;
}
