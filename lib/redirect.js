import i18nextConfig from '../next-i18next.config'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import languageDetector from './languageDetector';

export const useRedirect = (to) => {
  const router = useRouter()
  to = to || router.route

  const { locales, defaultLocale } = i18nextConfig.i18n
  locales.splice(locales.indexOf(defaultLocale), 1)
  locales.push(defaultLocale)

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect()
    for (const locale of locales) {
      // eslint-disable-next-line no-undef
      if (detectedLng.startsWith(locale)) {
        languageDetector.cacheUserLanguage(detectedLng)
        router.replace('/' + locale + to)
        return
      }
    }
    router.replace('/' + defaultLocale + to)
  }, [])

  return <></>
};