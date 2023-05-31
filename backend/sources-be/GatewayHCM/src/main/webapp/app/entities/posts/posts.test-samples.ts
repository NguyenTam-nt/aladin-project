import { IPosts, NewPosts } from './posts.model';

export const sampleWithRequiredData: IPosts = {
  id: 7346,
  title: 'withdrawal Outdoors',
  titleKo: 'azure Legacy payment',
  description: 'Ohio parsing grid-enabled',
  descriptionKo: 'copying Concrete',
  image: 'multi-byte',
  link: 'Triple-buffered Associate interface',
};

export const sampleWithPartialData: IPosts = {
  id: 33683,
  title: 'Small morph',
  titleKo: 'benchmark Bahraini Cotton',
  description: 'synthesizing parse payment',
  descriptionKo: 'Card Keyboard',
  image: 'Forward 6th',
  link: 'calculating web Dirham',
};

export const sampleWithFullData: IPosts = {
  id: 44016,
  title: 'benchmark',
  titleKo: '1080p Chief Awesome',
  description: 'Networked',
  descriptionKo: 'capacitor Fresh web-readiness',
  image: 'Spur Assurance',
  link: 'Steel',
  outstanding: false,
};

export const sampleWithNewData: NewPosts = {
  title: 'connecting',
  titleKo: 'Gloves',
  description: 'Licensed',
  descriptionKo: 'National Games',
  image: 'navigating',
  link: 'Rupee',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
