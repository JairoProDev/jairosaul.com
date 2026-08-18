import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { articleMdxComponents } from '@/components/article/mdx-components';

export async function MdxBody({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={articleMdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
