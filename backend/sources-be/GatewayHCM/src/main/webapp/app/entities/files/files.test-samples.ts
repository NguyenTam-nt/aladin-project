import { IFiles, NewFiles } from './files.model';

export const sampleWithRequiredData: IFiles = {
  id: 14378,
  objectId: 39188,
  link: 'Fundamental tan card',
};

export const sampleWithPartialData: IFiles = {
  id: 62010,
  objectId: 66607,
  type: 'Exclusive wireless Computers',
  link: 'Namibia',
  name: 'backing Dollar',
};

export const sampleWithFullData: IFiles = {
  id: 70646,
  objectId: 8319,
  type: 'Corporate invoice overriding',
  link: 'Kentucky connect',
  name: 'Beauty auxiliary',
};

export const sampleWithNewData: NewFiles = {
  objectId: 43469,
  link: 'platforms Oval back-end',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
