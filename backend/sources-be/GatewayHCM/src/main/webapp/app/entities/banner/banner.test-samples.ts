import { IBanner, NewBanner } from './banner.model';

export const sampleWithRequiredData: IBanner = {
  id: 74804,
  type: 'Towels',
  link: 'cultivate invoice archive',
};

export const sampleWithPartialData: IBanner = {
  id: 28525,
  type: 'Avon invoice',
  link: 'withdrawal Cheese',
};

export const sampleWithFullData: IBanner = {
  id: 19457,
  type: 'enable wireless green',
  link: 'violet',
};

export const sampleWithNewData: NewBanner = {
  type: 'microchip',
  link: 'cross-platform Somalia',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
