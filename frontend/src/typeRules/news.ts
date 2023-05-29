import type { IFile } from "./file";

export interface ICategory {
  id?: number;
  name?: string;
  nameKo?: string;
  parent?: number;
  status?: boolean;
  children?: ICategoryChild[];
}

export interface ICategoryChild {
  id?: number;
  name?: string;
  nameKo?: string;
  status?: boolean;
  parent?: number;
}

export interface INews {
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  id?: number;
  title: string;
  titleKo: string;
  description: string;
  descriptionKo: string;
  content: string;
  contentKo: string;
  view?: number;
  newsCategory?: ICategory;
  files?: IFile[];
}
