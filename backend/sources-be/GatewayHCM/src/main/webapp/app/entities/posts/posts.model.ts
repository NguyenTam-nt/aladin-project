export interface IPosts {
  id: number;
  title?: string | null;
  titleKo?: string | null;
  description?: string | null;
  descriptionKo?: string | null;
  image?: string | null;
  link?: string | null;
  outstanding?: boolean | null;
}

export type NewPosts = Omit<IPosts, 'id'> & { id: null };
