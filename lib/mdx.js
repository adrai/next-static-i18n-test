import { join } from 'path';
import { readFileSync, readdirSync, accessSync, constants } from 'fs';
import { bundleMDX } from 'mdx-bundler';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';

import i18nextConfig from '../next-i18next.config';

export async function getFiles(type) {
  return readdirSync(join(process.cwd(), 'data', type));
}

export async function getLocaleFile(locale, slug) {
  const fPath = join(process.cwd(), 'data', 'locales', locale, `${slug}.mdx`);
  let isInRequestedLanguage = true;
  try {
    await accessSync(fPath, constants.R_OK);
  } catch (err) {
    locale = i18nextConfig.i18n.defaultLocale;
    isInRequestedLanguage = false;
  }
  const f = await getFileBySlug(`locales/${locale}`, slug);
  f.isInRequestedLanguage = isInRequestedLanguage;
  return f;
}

export async function getFileBySlug(type, slug) {
  const fPath = slug
    ? join(process.cwd(), 'data', type, `${slug}.mdx`)
    : join(process.cwd(), 'data', `${type}.mdx`);
  const source = readFileSync(fPath, 'utf8');

  const { code, frontmatter } = await bundleMDX(source, {
    xdmOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor']
            }
          }
        ]
      ];
      return options;
    }
  });

  const tweetMatches = source.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  const tweetIDs = tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]);

  return {
    code,
    tweetIDs: tweetIDs || [],
    frontMatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...frontmatter
    }
  };
}

export async function getAllFilesFrontMatter(type) {
  const files = readdirSync(join(process.cwd(), 'data', type));

  return files.reduce((allPosts, postSlug) => {
    const source = readFileSync(
      join(process.cwd(), 'data', type, postSlug),
      'utf8'
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', '')
      },
      ...allPosts
    ];
  }, []);
}
