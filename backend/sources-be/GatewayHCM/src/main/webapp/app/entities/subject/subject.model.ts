export interface ISubject {
  id: number;
  name?: string | null;
  nameKo?: string | null;
  description?: string | null;
  descriptionKo?: string | null;
  titleKo?: string | null;
  contentKo?: string | null;
}

export type NewSubject = Omit<ISubject, 'id'> & { id: null };
