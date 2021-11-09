import { useCallback, useRef } from 'react';

import { useMount, useLocalStorage } from 'react-use';

import { useEventListener } from '@foundation/next';

import {
  get,
  has,
  map,
  isBlank,
  union,
  intersection,
  difference,
} from '@foundation/lib/util';

function mapValues(items = [], key = 'value') {
  return items.reduce((memo, item) => {
    if (typeof item === 'object' && has(item, key)) {
      memo.push(get(item, key));
    } else if (typeof item === 'string' || typeof item === 'number') {
      memo.push(item);
    }
    return memo;
  }, []);
}

export const useUserPreference = (
  preferenceKey,
  items = [],
  defaultValue,
  setter
) => {
  const [preference, setPreference, removePreference] = useLocalStorage(
    preferenceKey,
    defaultValue
  );

  useMount(() => {
    const values = mapValues(items);
    if (isBlank(values)) {
      if (typeof setter === 'function') setter(preference ?? defaultValue);
    } else if (preference && values.includes(preference)) {
      if (typeof setter === 'function') setter(preference);
    } else if (values.includes(defaultValue)) {
      if (typeof setter === 'function') setter(defaultValue);
      setPreference(defaultValue);
    } else {
      if (typeof setter === 'function') setter();
      removePreference();
    }
  });

  const updatePreference = useCallback(
    (value, cast) =>
      isBlank(value)
        ? removePreference()
        : setPreference(cast ? cast(value) : value),
    [removePreference, setPreference]
  );

  return [preference, updatePreference];
};

export const useUserSelection = (
  preferenceKey,
  items = [],
  defaultValue = [],
  setter
) => {
  const [preference, setPreference, removePreference] = useLocalStorage(
    preferenceKey,
    [].concat(defaultValue ?? [])
  );

  useMount(() => {
    const values = mapValues(items);

    let preferred = Array.isArray(preference) ? preference : [];
    if (values.length > 0) preferred = intersection(preferred, values);

    let defaults = Array.isArray(defaultValue) ? defaultValue : [];
    if (values.length > 0) defaults = intersection(defaults, values);

    if (preferred.length > 0) {
      if (typeof setter === 'function') setter(preferred);
    } else if (defaults.length > 0) {
      if (typeof setter === 'function') setter(defaults);
      setPreference(defaults);
    } else {
      if (typeof setter === 'function') setter([]);
      setPreference([]);
    }
  });

  const updatePreference = useCallback(
    (preference, cast) => {
      const values = mapValues(items);
      let preferred = Array.isArray(preference) ? preference : [];
      if (values.length > 0)
        preferred = intersection(
          cast ? map(preferred, cast) : preferred,
          values
        );
      setPreference(preferred);
    },
    [items, setPreference]
  );

  const togglePreference = useCallback(
    (value, cast) => {
      const preferred = Array.isArray(preference) ? preference : [];
      const v = cast ? cast(value) : value;
      const active = preferred.includes(v);
      updatePreference(
        active ? difference(preferred, [v]) : union(preferred, [v])
      );
    },
    [preference, updatePreference]
  );

  return [preference, togglePreference, updatePreference, removePreference];
};

export const useToggleStates = (
  selector,
  preferenceKey,
  items = [],
  defaultValue = [],
  setter,
  cast
) => {
  const [preference, togglePreference, updatePreference, removePreference] =
    useUserSelection(preferenceKey, items, defaultValue, setter);

  useEventListener('shown', selector, (e, target) => {
    togglePreference(target.dataset.id ?? target.id, cast);
  });

  useEventListener('hidden', selector, (e, target) => {
    togglePreference(target.dataset.id ?? target.id, cast);
  });

  return [preference, togglePreference, updatePreference, removePreference];
};

export const useClosable = persistenceKey => {
  const [isHidden, setHidden] = useUserPreference(persistenceKey, [], false);

  const ref = useRef();

  const onClose = useCallback(
    e => {
      e.preventDefault();
      if (isHidden) return;

      const { Transition, removeClass } = UIkit.util;
      if (ref.current) {
        removeClass(ref.current, 'uk-animation-fade');
        Transition.start(ref.current, { opacity: 0 }, 300).then(() =>
          setHidden(true)
        );
      } else {
        setHidden(true);
      }
    },
    [isHidden, setHidden]
  );

  return { ref, isHidden, setHidden, onClose };
};
