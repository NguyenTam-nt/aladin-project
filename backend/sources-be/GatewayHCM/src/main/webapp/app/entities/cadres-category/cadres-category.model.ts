import { ICadres } from 'app/entities/cadres/cadres.model';

export interface ICadresCategory {
  id: number;
  name?: string | null;
  nameKo?: string | null;
  cadres?: Pick<ICadres, 'id'> | null;
}

export type NewCadresCategory = Omit<ICadresCategory, 'id'> & { id: null };
