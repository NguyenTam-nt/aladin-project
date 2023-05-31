export interface IBanner {
  id: number;
  type?: string | null;
  link?: string | null;
}

export type NewBanner = Omit<IBanner, 'id'> & { id: null };
