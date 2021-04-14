import { useState, useCallback, useEffect, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import { useCookie } from 'next-universal-cookie';
import { useSettingEffect } from './settings';
import { isErrorPage } from './util';

const doNotTrack =
  typeof window !== 'undefined' &&
  typeof window.navigator !== 'undefined' &&
  (window.navigator.doNotTrack === '1' ||
    window.navigator.doNotTrack === 'yes');

export function useCookieConsent(type, options = {}) {
  const [enabled, setEnabled] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [settings, setSettings] = useState(null);
  const router = useRouter();

  let isEnabled = typeof window !== 'undefined' && options.enabled;
  isEnabled = isEnabled && !isErrorPage(router.route);

  // eslint-disable-next-line no-shadow
  useSettingEffect(type, (enabled, prompt, settings) => {
    setEnabled(enabled);
    setSettings(settings);
    if (isEnabled && prompt) {
      setPrompt(true);
    } else if (isEnabled) {
      setPrompt(false);
    }
  });

  const accept = useCallback(
    e => {
      if (e) e.preventDefault();
      if (settings) settings.set(type, true);
      if (settings && typeof options.accept === 'function') {
        options.accept(type, settings, e);
      }
    },
    [settings, options]
  );

  const reject = useCallback(
    e => {
      if (e) e.preventDefault();
      if (settings) settings.set(type, false);
      if (settings && typeof options.reject === 'function') {
        options.reject(type, settings, e);
      }
    },
    [settings, options]
  );

  return { settings, enabled, prompt, accept, reject };
}

export function useGoogleAnalytics(options = {}) {
  const { initialize, force, ignoreDoNotTrack } = options;
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_GA;
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = force || process.env.NODE_ENV === 'production';
  const tracking = ignoreDoNotTrack ? true : !doNotTrack;
  const enabled = analyticsId && (tracking || force || isDevelopment);

  const [, , removeCookie] = useCookie(['_ga', '_gat', '_gid']);

  const consent = useCookieConsent('analytics', {
    enabled,
    reject: () => {
      removeCookie('_ga');
      removeCookie('_gat');
      removeCookie('_gid');
    },
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (initialize && consent.enabled && !consent.prompt) {
      if (isProduction) ReactGA.initialize(analyticsId);
      logPageView();
      Router.events.off('routeChangeComplete', logPageView); // clear
      Router.events.on('routeChangeComplete', logPageView);
      return () => Router.events.off('routeChangeComplete', logPageView);
    }
  }, [initialize, consent.enabled, consent.prompt]);

  const log = useMemo(() => {
    const isEnabled = isProduction && consent.enabled;
    return {
      pageView() {
        if (isEnabled) logPageView();
      },
      modalView(name) {
        if (isEnabled) ReactGA.modalview(name);
      },
      event(category, action, label = '') {
        if (isEnabled) {
          if (typeof category === 'object') {
            ReactGA.event(category);
          } else if (category && action) {
            ReactGA.event({ category, action, label });
          }
        }
      },
      exception(description = '', fatal = false) {
        if (isEnabled && description) {
          ReactGA.exception({ description, fatal });
        }
      },
    };
  }, [consent.enabled]);

  return { ...consent, ga: ReactGA, log, enabled, tracking };
}

function logPageView() {
  if (typeof window !== 'undefined') {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.set({ page: window.location.pathname });
      ReactGA.pageview(window.location.pathname);
    } else {
      // eslint-disable-next-line no-console
      console.log('[react-ga] %s (dev)', window.location.pathname);
    }
  }
}
