export interface IHistory {
  id: number;
  year?: number | null;
  image?: string | null;
  description?: string | null;
  descriptionKo?: string | null;
}

export type NewHistory = Omit<IHistory, 'id'> & { id: null };
