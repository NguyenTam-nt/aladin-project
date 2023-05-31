export interface ISubject {
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  id: number;
  name: string;
  nameKo: string;
  description: string;
  descriptionKo: string;
  title: string;
  titleKo: string;
  content: string;
  contentKo: string;
  files: [
    {
      id? : string;
      type: string;
      link: string;
      name: string;
    }
  ];
}

export interface ISubjectPost {
  name: string;
  nameKo: string;
  description: string;
  descriptionKo: string;
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
}

export interface ISubjectPostCheck extends Record<string, any>{
  name: string;
  nameKo: string;
  description: string;
  descriptionKo: string;
  title: string;
  titleKo: string;
  content: string;
  contentKo: string;
  files: string;
}
