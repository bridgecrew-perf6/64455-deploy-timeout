import { useState, useCallback, useEffect } from 'react';

import { useRouter } from './router';
import { isBlank } from './util';

export const useSearchForm = (action = '/search', options = {}) => {
  const {
    onSubmit,
    onAfterSubmit,
    onComplete,
    defaultToQuery,
    defaultValue = '',
    param = 'query',
  } = options;

  const router = useRouter();

  const [query, setQuery] = useState(defaultValue);

  const [touched, setTouched] = useState(false);
  const [pending, setPending] = useState(false);

  const handleReset = useCallback(() => {
    setQuery('');
  }, []);

  const handleChange = useCallback(e => {
    setTouched(true);
    setQuery(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setPending(true);
      const method = router.pathname.startsWith(action) ? 'replace' : 'push';
      if (typeof onSubmit === 'function') {
        onSubmit(router, action, query);
      } else {
        router[method]({
          pathname: action,
          query: { [param]: query },
          shallow: true,
        });
      }
      if (typeof onAfterSubmit === 'function') {
        onAfterSubmit(router, action, query);
      }
    },
    [action, onSubmit, onAfterSubmit, param, query, router]
  );

  useEffect(() => {
    const handleRouteChange = () => {
      if (pending && typeof onComplete === 'function') {
        const isOnPage = router.pathname.startsWith(action);
        onComplete(query, isOnPage, handleReset);
        setPending(false);
      } else if (pending) {
        handleReset();
        setPending(false);
      }
    };

    if (!touched && defaultToQuery && !isBlank(router.query[param])) {
      setQuery(router.query[param]);
    }

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChange);
    };
  }, [
    router,
    pending,
    onComplete,
    query,
    handleReset,
    action,
    defaultToQuery,
    touched,
    param,
  ]);

  return [query, handleChange, handleSubmit, handleReset];
};
