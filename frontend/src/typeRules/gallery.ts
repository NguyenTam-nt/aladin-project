export interface IGallery {
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  id: number;
  name : string ;
  nameKo: string;
  des? :string ,
  desKo? : string,
  type: string;
  files: IFileGallery[]
}
export interface IGalleryImage {
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  id: number;
  nameKo: string;
  name: string;
  des?: string;
  desKo?: string;
  type: string;
  files: {
    content: IFileGalleryValue[];
    totalPages: number;
    totalElements: number;
  };
}
export interface IFileGalleryValue  {
  id?: number;
  type?: string;
  link?: string;
  name?: string;
}

export interface IFileGallery  {
  id? : number;
  type?: string;
  link: string;
  name?: string;
}

export interface IGalleryPost {
  name : string ;
  nameKo: string;
  des? :string ,
  desKo? : string,
  type: string;
  files: IFileGallery[]
}

export interface IGalleryPutImage {
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  id: number;
  nameKo: string;
  name: string;
  des?: string;
  desKo?: string;
  type: string;
  files: IFileGalleryValue[];
}


export interface IGalleryPostCheck extends Record<string, any> {
  name : string
  nameKo: string;
  des? :string ,
  desKo? : string,
  type?: string;
  files?: string;
}