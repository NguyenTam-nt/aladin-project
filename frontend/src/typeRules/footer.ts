export interface IFooter {
  id?: number;
  name?: string;
  nameKo?: string;
  path?: number;
  parentId?: number;
  items?: {
    id?: number;
    name?: string;
    nameKo?: string;
    path?: number;
    parentId?: number;
  }[];
}

export enum FooterInfoType {
  fb = "FACEBOOK",
  yt = "YOUTUBE",
  lk = "LINKEDIN",
}

export interface IFooterInfo {
  id?: number;
  title?: string;
  type?: FooterInfoType;
  link?: string;
}

export interface IHeader {
  id?: number
  index?: number
  name?: string
  nameKo?: string
  element?: any
  status?: boolean
  link?: string
  path?: string
  parent?: number
  items?: 
    {
      id?: number
      index?: number
      element?: any
      name?: string
      status?: boolean
      nameKo?: string
      link?: string
      path?: string
      parent?: number
    }[]
  
}
