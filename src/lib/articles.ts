import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { format } from 'date-fns';

const articlesDirectory = path.join(process.cwd(), 'input/articles');

export interface Article {
  id: string;
  title: string;
  date: string;
  content: string;
  contentHtml: string;
}

export function getAllArticleIds(): string[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return '日付なし';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '日付なし';
    }
    return format(date, 'yyyy年MM月dd日');
  } catch (error) {
    console.error(error)
    return '日付なし';
  }
}

export async function getArticleData(id: string): Promise<Article> {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    title: data.title || '無題',
    date: formatDate(data.date),
    content,
    contentHtml,
  };
}

export function getAllArticles(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      id,
      title: data.title || '無題',
      date: formatDate(data.date),
      content: '',
      contentHtml: '',
    };
  });

  return allArticlesData.sort((a, b) => {
    if (a.date === '日付なし' || b.date === '日付なし') return 0;
    return a.date < b.date ? 1 : -1;
  });
}