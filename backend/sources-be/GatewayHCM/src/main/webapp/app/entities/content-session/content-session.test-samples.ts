import { IContentSession, NewContentSession } from './content-session.model';

export const sampleWithRequiredData: IContentSession = {
  id: 69007,
  type: 'Romania turquoise payment',
  category: 'Cambridgeshire Jewelery',
  categoryKo: 'SDD Frozen RSS',
  tilte: 'bottom-line invoice',
  tilteKo: 'Generic cross-platform Route',
  content: 'Nebraska platforms',
  contentKo: 'Integration compressing Ports',
};

export const sampleWithPartialData: IContentSession = {
  id: 94268,
  type: 'Car Cove Chief',
  category: 'turquoise',
  categoryKo: 'Shore red payment',
  tilte: 'alarm Serbian',
  tilteKo: 'withdrawal Personal',
  content: 'Digitized',
  contentKo: 'complexity',
};

export const sampleWithFullData: IContentSession = {
  id: 82776,
  type: 'Shoes',
  category: 'Account',
  categoryKo: 'system',
  tilte: 'pink',
  tilteKo: 'Wooden Dominican',
  content: 'digital bandwidth',
  contentKo: 'Savings Officer hack',
};

export const sampleWithNewData: NewContentSession = {
  type: 'next-generation Avon synthesizing',
  category: 'incentivize methodology deposit',
  categoryKo: 'Books envisioneer Borders',
  tilte: 'up',
  tilteKo: 'Paraguay',
  content: 'Re-contextualized',
  contentKo: 'user Engineer Gloves',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
