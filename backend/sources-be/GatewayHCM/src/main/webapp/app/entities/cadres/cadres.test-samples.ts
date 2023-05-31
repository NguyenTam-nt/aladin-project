import { ICadres, NewCadres } from './cadres.model';

export const sampleWithRequiredData: ICadres = {
  id: 87160,
  fullname: 'Fork Virginia primary',
  fullnameKo: 'protocol open-source Indian',
  position: 'Paradigm',
  positionKo: 'synergies Rue Refined',
  email: 'HVK-4%@42PY6SVFAU',
  major: 'Savings Solomon parsing',
  majorKo: 'Executive Cambridgeshire Front-line',
  workResponsibility: 'Taka Incredible',
  workResponsibilityKo: 'Rubber',
  title: 'applications e-business non-volatile',
  titleKo: 'SQL Cheese',
  content: 'payment Bedfordshire',
  contentKo: 'Fresh Electronics',
};

export const sampleWithPartialData: ICadres = {
  id: 37683,
  fullname: 'cross-platform',
  fullnameKo: 'Towels tertiary',
  position: 'AGP Corporate Florida',
  positionKo: 'payment Bedfordshire',
  email: 'XHK6@GYK58$YKM',
  major: 'Unbranded Wooden mission-critical',
  majorKo: 'Configuration Maryland deposit',
  workResponsibility: 'up Dynamic',
  workResponsibilityKo: 'gold Public-key',
  title: 'IB architect Solutions',
  titleKo: 'bluetooth Buckinghamshire Fantastic',
  content: 'calculate multi-byte Anguilla',
  contentKo: 'system backing mint',
};

export const sampleWithFullData: ICadres = {
  id: 84235,
  fullname: 'Borders Customizable challenge',
  fullnameKo: 'National Shoes',
  position: 'solutions Baby Fantastic',
  positionKo: 'withdrawal analyzer e-tailers',
  email: 'W2YH1@US\rUJZPOH',
  major: 'invoice',
  majorKo: 'homogeneous drive',
  workResponsibility: 'Ports Carolina visionary',
  workResponsibilityKo: 'Buckinghamshire Intelligent Distributed',
  title: 'Mississippi Planner',
  titleKo: 'white SQL copy',
  content: 'open-source',
  contentKo: 'Plastic Kwanza',
};

export const sampleWithNewData: NewCadres = {
  fullname: 'York',
  fullnameKo: 'mobile generation Ohio',
  position: 'Peso',
  positionKo: 'Assurance',
  email: '.V@PAKS\\OMNQ',
  major: 'Borders Vanuatu Personal',
  majorKo: 'Human Tennessee bleeding-edge',
  workResponsibility: 'Steel support',
  workResponsibilityKo: 'Markets invoice optical',
  title: 'Account virtual',
  titleKo: 'North',
  content: 'Security engineer',
  contentKo: 'Fork generating',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
