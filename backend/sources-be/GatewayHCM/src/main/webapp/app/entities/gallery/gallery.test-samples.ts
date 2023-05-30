import { GalleryType } from 'app/entities/enumerations/gallery-type.model';

import { IGallery, NewGallery } from './gallery.model';

export const sampleWithRequiredData: IGallery = {
  id: 93059,
  nameKo: 'violet strategic XSS',
};

export const sampleWithPartialData: IGallery = {
  id: 41829,
  nameKo: 'Metal Lilangeni Operations',
};

export const sampleWithFullData: IGallery = {
  id: 35191,
  nameKo: 'Track',
  type: GalleryType['VIDEO'],
};

export const sampleWithNewData: NewGallery = {
  nameKo: 'parallelism approach',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
