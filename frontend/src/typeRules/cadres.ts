export  interface ICadres {
  createdBy?: string;
  createdDate?:  string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  id: number;
  fullname: string;
  fullnameKo: string;
  position: string;
  positionKo: string;
  email: string;
  major: string;
  majorKo: string;
  workResponsibility: string;
  workResponsibilityKo: string;
  title: string;
  titleKo: string;
  content: string;
  contentKo: string;
  files: [
    {
      id?: number;
      type: string;
      link: string;
      name: string;
    }
  ];
  cadresCategory: {
    id: number;
    name?: string;
    nameKo?: string;
  };
}

export interface ICadresPost {
  fullname: string;
  fullnameKo: string;
  position: string;
  positionKo: string;
  email: string;
  major: string;
  majorKo: string;
  workResponsibility: string;
  workResponsibilityKo: string;
  title: string;
  titleKo: string;
  content: string;
  contentKo: string;
  files: [
    {
      type: string;
      link: string;
      name: string;
    }
  ];
  cadresCategory: {
    id: number;
  };
}

export interface ICategotiesCadres {
  id: number;
  name: string;
  nameKo: string;
}

export interface ICadresPostCheck  extends Record<string, any>{
  fullname: string;
  fullnameKo: string;
  position: string;
  positionKo: string;
  email: string;
  major: string;
  majorKo: string;
  workResponsibility: string;
  workResponsibilityKo: string;
  title: string;
  titleKo: string;
  content: string;
  contentKo: string;
  files: string ,
  cadresCategory: number
}