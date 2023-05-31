import { INews, NewNews } from './news.model';

export const sampleWithRequiredData: INews = {
  id: 76512,
  tilte: 'green parallelism Identity',
  tilteKo: 'Litas Usability Data',
  description: 'throughput open-source',
  descriptionKo: 'Indian',
  content: 'Mouse heuristic',
  contentKo: 'framework',
};

export const sampleWithPartialData: INews = {
  id: 94578,
  tilte: 'Internal',
  tilteKo: 'Cross-platform Convertible',
  description: 'District Creative',
  descriptionKo: 'port',
  content: 'Officer',
  contentKo: 'whiteboard RSS Ball',
};

export const sampleWithFullData: INews = {
  id: 12022,
  tilte: 'Self-enabling',
  tilteKo: 'Principal',
  description: 'digital',
  descriptionKo: 'structure Assistant',
  content: 'deposit Planner',
  contentKo: 'SAS JSON 24/7',
};

export const sampleWithNewData: NewNews = {
  tilte: 'Equatorial',
  tilteKo: 'Jewelery',
  description: 'Kentucky Ball',
  descriptionKo: 'Web',
  content: 'Regional',
  contentKo: 'upward-trending Silver',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
