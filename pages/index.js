import i18nextConfig from '../next-i18next.config'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import languageDetector from '../lib/languageDetector';

export const getStaticProps = () => {
  const { locales, defaultLocale } = i18nextConfig.i18n
  locales.splice(locales.indexOf(defaultLocale), 1)
  locales.push(defaultLocale)
  return {
    props: {
      locales,
    },
  }
}

const Index = ({ locales }) => {
  const router = useRouter()

  // language detection
  useEffect(() => {
    const detectedLng = languageDetector.detect()
    for (const locale of locales) {
      // eslint-disable-next-line no-undef
      if (detectedLng.startsWith(locale)) {
        languageDetector.cacheUserLanguage(detectedLng)
        router.replace('/' + locale)
        return
      }
    }
  }, [])

  return <></>
}

export default Index
