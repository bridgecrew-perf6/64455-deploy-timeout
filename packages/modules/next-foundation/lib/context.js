import React, { useState, useEffect } from 'react';

export function createContextProvider(Context, value) {
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
  }, [value]);

  return state;
}
