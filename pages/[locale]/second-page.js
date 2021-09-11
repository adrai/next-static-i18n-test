import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import components from '@/components/MDXComponents';
import Container from '@/components/Container';
import { StaticI18nLink } from '@/components/StaticI18nLink';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import getSlug from '@/lib/getSlug'
// import { useTranslation } from 'next-i18next'
import { hasCookieConsent } from '@/lib/analytics';

export default function Test({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  // const { t, i18n } = useTranslation('common')

  return (
    <Container
      title={frontMatter.name}
      description="bla bla"
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <div className="prose dark:prose-dark w-full">
          <Component components={components} />
          <hr />
          <StaticI18nLink href='/third-page'>
            <button
              type='button'
            >
              third page
            </button>
          </StaticI18nLink>
          <hr />
          {hasCookieConsent() && (
            <iframe
              width="640"
              height="360"
              src="https://www.youtube-nocookie.com/embed/YQryHo1iHb8?rel=0&controls=0&showinfo=0"
              frameBorder="0"
              webkitallowfullscreen=""
              mozallowfullscreen=""
              allowFullScreen=""
            />
          )}
          {!hasCookieConsent() && (
            <a href="https://youtu.be/YQryHo1iHb8" >watch video</a>
          )}
        </div>
      </article>
    </Container>
  );
}

const getStaticProps = makeStaticProps(getSlug(import.meta.url));
export { getStaticPaths, getStaticProps };