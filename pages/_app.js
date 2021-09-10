import '@/styles/global.css';

import { ThemeProvider } from 'next-themes';
import { useAnalytics } from '@/lib/analytics';

import { appWithTranslation } from 'next-i18next'

import CookieConsent from 'react-cookie-consent';

const cookieConsentName = 'cookieconsentStatus';

function App({ Component, pageProps }) {
  const enable = useAnalytics(cookieConsentName);

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
      <CookieConsent
        enableDeclineButton
        location="bottom"
        buttonText="Sure man!!"
        cookieName={cookieConsentName}
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={360}
        onAccept={() => enable()}
      >
        This website uses cookies to enhance the user experience.{" "}
        <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span>
      </CookieConsent>
    </ThemeProvider>
  );
}

export default appWithTranslation(App)