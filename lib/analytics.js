import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCookieConsentValue } from "react-cookie-consent";

const googleAnalyticsId = 'UA-00000000-1'

export const useAnalytics = (cookieConsentName) => {
  const router = useRouter();

  const enable = () => {
    return new Promise((resolve, reject) => {
      import('react-ga').then((module) => {
        const ReactGA = module.default;
        ReactGA.initialize(googleAnalyticsId);
        ReactGA.ga('set', 'anonymizeIp', true);
        ReactGA.ga('send', 'pageview');
        resolve(ReactGA);
      }).catch(reject);
    });
  };

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    let ReactGA = { pageview: () => {} };

    if (getCookieConsentValue(cookieConsentName) === 'true') {
      console.log('enabled')
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

  return enable;
};
