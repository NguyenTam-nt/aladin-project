export interface INewsCategory {
  id: number;
  name?: string | null;
  nameKo?: string | null;
}

export type NewNewsCategory = Omit<INewsCategory, 'id'> & { id: null };
