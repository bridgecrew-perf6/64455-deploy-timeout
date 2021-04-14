import React, { useState, useEffect } from 'react';

export function useContextProvider(Context, value) {
  const [state, setState] = useState(() => {
    return ({ children }) => {
      return React.createElement(
        Context.Provider,
        {
          value,
        },
        children
      );
    };
  });

  useEffect(() => {
    setState(() => {
      return ({ children }) => {
        return React.createElement(
          Context.Provider,
          {
            value,
          },
          children
        );
      };
    });
  }, [Context.Provider, value]);

  return state;
}
