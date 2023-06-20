export interface IResponseData<T> {
  totalElement: number;
  totalElementPage: number;
  list: T[];
}

export interface IDataImage {
  list: IImage[];
  totalElement: number;
  totalElementPage: number;
}

export interface IImage {
  linkMedia?: string;
  linkBannerMedia?: string;
}

export interface INews {
  id?: number | null;
  linkMedia?: string;
  title: string;
  content: string;
  description: string;
}

export interface IParams {
  page?: string | number;
  size?: number;
  sort?: string;
  [key: string]: any;
}

export interface IReview {
  id?: number | null;
  linkProduct?: string;
  linkGuest?: string;
  fullname: string;
  career: string;
  comment: string;
  show?: boolean;
}
