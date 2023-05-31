import { IHeaderNavbar, NewHeaderNavbar } from './header-navbar.model';

export const sampleWithRequiredData: IHeaderNavbar = {
  id: 14353,
};

export const sampleWithPartialData: IHeaderNavbar = {
  id: 67532,
  link: 'Division networks reinvent',
  parent: 14208,
};

export const sampleWithFullData: IHeaderNavbar = {
  id: 20027,
  index: 83533,
  name: 'best-of-breed',
  nameKo: 'transmitter Luxembourg Quality-focused',
  link: 'Incredible',
  parent: 2584,
};

export const sampleWithNewData: NewHeaderNavbar = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
