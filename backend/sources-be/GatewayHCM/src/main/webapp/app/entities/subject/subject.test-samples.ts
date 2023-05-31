import { ISubject, NewSubject } from './subject.model';

export const sampleWithRequiredData: ISubject = {
  id: 33079,
  name: 'virtual',
  nameKo: 'port Jamaican stable',
  description: 'Administrator users Dynamic',
  descriptionKo: 'Borders',
  titleKo: 'Overpass',
  contentKo: 'Down-sized reboot Central',
};

export const sampleWithPartialData: ISubject = {
  id: 17827,
  name: 'SAS open-source',
  nameKo: 'multi-byte',
  description: 'strategic compelling',
  descriptionKo: 'THX services',
  titleKo: 'Baby Borders Fresh',
  contentKo: 'Analyst transition',
};

export const sampleWithFullData: ISubject = {
  id: 9678,
  name: 'Response Summit channels',
  nameKo: 'Chair',
  description: 'Decentralized Concrete',
  descriptionKo: 'Tasty Tasty withdrawal',
  titleKo: 'relationships',
  contentKo: 'drive bandwidth green',
};

export const sampleWithNewData: NewSubject = {
  name: 'Intelligent Colombia',
  nameKo: 'green Frozen PNG',
  description: 'state Unbranded optical',
  descriptionKo: 'system lime',
  titleKo: 'Dinar Pataca',
  contentKo: 'invoice deposit capacitor',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
