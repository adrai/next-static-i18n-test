import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import components from '@/components/MDXComponents';
import Container from '@/components/Container';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic'
import getSlug from '@/lib/getSlug'
// import { useTranslation } from 'next-i18next'

export default function Test({ code, frontMatter, isInRequestedLanguage }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  // const { t, i18n } = useTranslation('common')

  return (
    <Container
      title={frontMatter.name}
      description="bla bla"
    >
      {!isInRequestedLanguage && <span style={{ color: 'red' }}>This content is not available in you requested language right now...</span>}
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <div className="prose dark:prose-dark w-full">
          <Component components={components} />
        </div>
      </article>
    </Container>
  );
}

const getStaticProps = makeStaticProps(getSlug(import.meta.url));
export { getStaticPaths, getStaticProps };
