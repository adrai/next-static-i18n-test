import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import components from '@/components/MDXComponents';
import Container from '@/components/Container';
import { StaticI18nLink } from '@/components/StaticI18nLink';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import getSlug from '@/lib/getSlug'
import { useTranslation } from 'next-i18next'

export default function Test({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const { t, i18n } = useTranslation('common')

  return (
    <Container
      title={frontMatter.name}
      description="bla bla"
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <div className="prose dark:prose-dark w-full">
          coming from i18next: {t('title')}
          <hr />
          coming from markdown:
          <Component components={components} />
          <hr />
          <div style={{ display: 'grid' }}>
            <StaticI18nLink
              href='/'
              locale={i18n.language === 'en' ? 'de' : 'en'}
            >
              <button>
                {t('change-locale')}
              </button>
            </StaticI18nLink>
            <StaticI18nLink href='/second-page'>
              <button
                type='button'
              >
                {t('to-second-page')}
              </button>
            </StaticI18nLink>
          </div>
        </div>
      </article>
    </Container>
  );
}

const getStaticProps = makeStaticProps(getSlug(import.meta.url));
export { getStaticPaths, getStaticProps };
