import { INewsCategory } from 'app/entities/news-category/news-category.model';

export interface INews {
  id: number;
  tilte?: string | null;
  tilteKo?: string | null;
  description?: string | null;
  descriptionKo?: string | null;
  content?: string | null;
  contentKo?: string | null;
  newsCategory?: Pick<INewsCategory, 'id'> | null;
}

export type NewNews = Omit<INews, 'id'> & { id: null };
