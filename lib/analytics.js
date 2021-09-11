import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCookieConsentValue } from "react-cookie-consent";

export const hasCookieConsent = () => getCookieConsentValue(process.env.NEXT_PUBLIC_COOKIE_CONSENT_NAME) === 'true';

export const useAnalytics = () => {
  const router = useRouter();

  const [enabled, setEnabled] = useState(hasCookieConsent());

  const enable = () => {
    setEnabled(true);
    if (process.env.NODE_ENV !== 'production') return

    return new Promise((resolve, reject) => {
      import('react-ga').then((module) => {
        const ReactGA = module.default;
        ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID);
        ReactGA.ga('set', 'anonymizeIp', true);
        ReactGA.ga('send', 'pageview');
        resolve(ReactGA);
      }).catch(reject);
    });
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    let ReactGA = { pageview: () => {} };

    if (hasCookieConsent()) {
      enable().then((mod) => {
        ReactGA = mod;
      })
    }
    function onRouteChangeComplete(path) {
      ReactGA.pageview(path);
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return [enabled, enable];
};
