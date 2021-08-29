import '@/styles/global.css';

import { ThemeProvider } from 'next-themes';
import { useAnalytics } from '@/lib/analytics';

import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }) {
  useAnalytics();

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(App)