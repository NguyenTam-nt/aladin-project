export interface IHeaderNavbar {
  id: number;
  index?: number | null;
  name?: string | null;
  nameKo?: string | null;
  link?: string | null;
  parent?: number | null;
}

export type NewHeaderNavbar = Omit<IHeaderNavbar, 'id'> & { id: null };
