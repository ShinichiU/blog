import { getAllArticleIds, getArticleData } from '@/lib/articles';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const paths = getAllArticleIds();
  return paths.map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = await getArticleData(params.id);
  return {
    title: `${article.title} | 卜部の開発ブログ`,
    description: article.content.slice(0, 160) + '...',
    openGraph: {
      title: article.title,
      description: article.content.slice(0, 160) + '...',
      type: 'article',
      publishedTime: article.date,
    },
  };
}

export default async function Article({ params }: { params: { id: string } }) {
  const article = await getArticleData(params.id);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
        ← 記事一覧に戻る
      </Link>
      <article className="prose lg:prose-xl dark:prose-invert">
        <h1 className="text-gray-900 dark:text-white">{article.title}</h1>
        <time className="text-gray-500 dark:text-gray-400" dateTime={article.date}>{article.date}</time>
        <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
      </article>
    </main>
  );
}