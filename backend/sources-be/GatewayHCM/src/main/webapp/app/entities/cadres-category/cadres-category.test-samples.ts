import { ICadresCategory, NewCadresCategory } from './cadres-category.model';

export const sampleWithRequiredData: ICadresCategory = {
  id: 75091,
  name: 'extensible Administrator',
  nameKo: 'Synchronised multi-state',
};

export const sampleWithPartialData: ICadresCategory = {
  id: 53282,
  name: 'Borders',
  nameKo: 'Bacon Wooden magenta',
};

export const sampleWithFullData: ICadresCategory = {
  id: 30019,
  name: 'port digital Egypt',
  nameKo: 'Jewelery Shore intranet',
};

export const sampleWithNewData: NewCadresCategory = {
  name: 'Communications',
  nameKo: 'Account',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
