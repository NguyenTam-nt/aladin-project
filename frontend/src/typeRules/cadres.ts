export  interface ICadres {
  createdBy: string;
  createdDate:  string;
  lastModifiedBy: string;
  lastModifiedDate: string;
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
      id: number;
      type: string;
      link: string;
      name: string;
    }
  ];
  cadresCategory: {
    id: number;
    name: string;
    nameKo: string;
  };
}
