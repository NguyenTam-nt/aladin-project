import { INewsCategory, NewNewsCategory } from './news-category.model';

export const sampleWithRequiredData: INewsCategory = {
  id: 62116,
};

export const sampleWithPartialData: INewsCategory = {
  id: 64635,
  name: 'virtual open-source Saint',
  nameKo: 'Bedfordshire Ergonomic programming',
};

export const sampleWithFullData: INewsCategory = {
  id: 36292,
  name: 'Ghana deploy',
  nameKo: 'Enhanced Senior',
};

export const sampleWithNewData: NewNewsCategory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
