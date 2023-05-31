export interface IContentSession {
  id: number;
  type?: string | null;
  category?: string | null;
  categoryKo?: string | null;
  tilte?: string | null;
  tilteKo?: string | null;
  content?: string | null;
  contentKo?: string | null;
}

export type NewContentSession = Omit<IContentSession, 'id'> & { id: null };
