import { getLocaleFile } from './mdx';
import { getI18nPaths } from './getI18nPaths'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import i18nextConfig from '../next-i18next.config' // used as current next-i18next workaround for next.js > v10.2

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
})

export function makeStaticProps(slug, ns = ['common']) {
  return async function getStaticProps(ctx) {
    return {
      props: {
        // if using markdown
        ...await getLocaleFile(ctx?.params?.locale, slug),

        // if using i18next here in react code
        ...await serverSideTranslations(ctx?.params?.locale, ns, /*i18nextConfig*/),
      }
    }
  };
}