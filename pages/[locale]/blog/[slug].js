import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import components from '@/components/MDXComponents';
import BlogLayout from '@/layouts/blog';
import { getFiles, getLocaleFile } from '@/lib/mdx';
import i18nConfig from '../../../next-i18next.config'

export default function Blog({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <BlogLayout frontMatter={frontMatter}>
      <Component
        components={components}
      />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles(`locales/${i18nConfig.i18n.defaultLocale}/blog`);
  return {
    paths: posts.map((p) => i18nConfig.i18n.locales.map((l) => ({
      params: {
        locale: l,
        slug: p.replace(/\.mdx/, '')
      }
    }))).reduce((ret, curr) => {
      ret = ret.concat(curr)
      return ret
    }, []),
    fallback: false
  };
}

export async function getStaticProps(ctx) {
  return {
    props: {
      // if using markdown
      ...await getLocaleFile(ctx?.params?.locale, `blog/${ctx?.params?.slug}`),
    }
  }
}