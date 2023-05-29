export interface IVideo {
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  id: number;
  nameKo: string;
  type: string;
  files: [
    {
      id: number;
      type: string;
      link: string;
      name: string;
    }
  ];
}

export interface IGalleryPost {
  nameKo: string;
  type: string;
  files: [
    {
      type?: string;
      link: string;
      name?: string;
    }
  ];
}


export interface IGalleryPostCheck {
  name : string
  nameKo: string;
  type: string;
  files: string;
}