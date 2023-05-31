export interface ICadres {
  id: number;
  fullname?: string | null;
  fullnameKo?: string | null;
  position?: string | null;
  positionKo?: string | null;
  email?: string | null;
  major?: string | null;
  majorKo?: string | null;
  workResponsibility?: string | null;
  workResponsibilityKo?: string | null;
  title?: string | null;
  titleKo?: string | null;
  content?: string | null;
  contentKo?: string | null;
}

export type NewCadres = Omit<ICadres, 'id'> & { id: null };
