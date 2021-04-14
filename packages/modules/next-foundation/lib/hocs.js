import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function withPortal(Component, containerId = '__next') {
  return (props = {}) => {
    const [container, setContainer] = useState();

    useEffect(() => {
      setContainer(document.getElementById(containerId));
    }, [containerId]);

    return container ? createPortal(<Component {...props} />, container) : null;
  };
}
