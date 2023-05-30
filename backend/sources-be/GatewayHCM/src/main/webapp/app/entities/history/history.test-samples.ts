import { IHistory, NewHistory } from './history.model';

export const sampleWithRequiredData: IHistory = {
  id: 42912,
  year: 74638,
  image: 'Fresh',
  description: 'Coordinator',
  descriptionKo: 'Centralized Cambridgeshire',
};

export const sampleWithPartialData: IHistory = {
  id: 3622,
  year: 17335,
  image: 'Small navigate Shoes',
  description: 'Supervisor',
  descriptionKo: 'Sudanese',
};

export const sampleWithFullData: IHistory = {
  id: 7912,
  year: 58770,
  image: 'redundant',
  description: 'parsing Fantastic',
  descriptionKo: 'Accountability',
};

export const sampleWithNewData: NewHistory = {
  year: 65546,
  image: 'navigate Wooden',
  description: 'indexing Prairie',
  descriptionKo: 'Som purple',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
