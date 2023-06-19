export interface IResponseData<T> {
  total: number;
  data: T[];
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
