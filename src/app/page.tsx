import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '卜部の開発ブログ - 記事一覧',
  description: 'Web開発、プログラミング、技術的な知見を共有するブログの記事一覧です。',
};

export default function Home() {
  const articles = getAllArticles();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">記事一覧</h1>
      <div className="space-y-6">
        {articles.map((article) => (
          <article key={article.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <Link href={`/articles/${article.id}`} className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{article.title}</h2>
              <time className="text-gray-500 dark:text-gray-400" dateTime={article.date}>{article.date}</time>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
