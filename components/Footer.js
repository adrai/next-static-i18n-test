import Link from 'next/link';

import i18nextConfig from '../next-i18next.config'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

// const ExternalLink = ({ href, children }) => (
//   <a
//     className="text-gray-500 hover:text-gray-600 transition"
//     target="_blank"
//     rel="noopener noreferrer"
//     href={href}
//   >
//     {children}
//   </a>
// );

export default function Footer(props) {
  const { i18n } = useTranslation()
  const router = useRouter()
  const currentLocale = props.locale || router.query.locale || i18n.language || ''
  
  const getCorrectHref = (locale) => {
    let href = props.href || router.asPath
    if (locale) {
      href = props.href
        ? `/${locale}${props.href}`
        : router.pathname.replace('[locale]', locale)
    }
    return href
  }

  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 transition">Home</a>
          </Link>
          {/* <Link href="/about">
            <a className="text-gray-500 hover:text-gray-600 transition">
              About
            </a>
          </Link>
          <Link href="/newsletter">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Newsletter
            </a>
          </Link> */}
        </div>
        <div className="flex flex-col space-y-4">
          {/* <ExternalLink href="https://twitter.com/leeerob">
            Twitter
          </ExternalLink>
          <ExternalLink href="https://github.com/leerob">GitHub</ExternalLink>
          <ExternalLink href="https://www.youtube.com/channel/UCZMli3czZnd1uoc1ShTouQw">
            YouTube
          </ExternalLink> */}
        </div>
        <div className="flex flex-col space-y-4">
          {i18nextConfig.i18n.locales.map((locale) => {
            if (locale === currentLocale) return null;
            return (<Link key={locale} href={getCorrectHref(locale)}>
              <a className="text-gray-500 hover:text-gray-600 transition">{locale}</a>
            </Link>)
          })}
          {/* <Link href="/uses">
            <a className="text-gray-500 hover:text-gray-600 transition">Uses</a>
          </Link>
          <Link href="/guestbook">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Guestbook
            </a>
          </Link>
          <Link href="/snippets">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Snippets
            </a>
          </Link>
          <Link href="/tweets">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Tweets
            </a>
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
