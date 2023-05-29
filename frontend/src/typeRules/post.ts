export enum PostType {
    postBanner = "BANNERPOST",
    postEvent = "BANNERPOST",
    postStudy = "POSTSTUDY",
    postCenter = "POSTCENTER"
}


export interface IPost {
  createdBy?: string;
  createdDate?: string;
  id?: number;
  title?: string;
  titleKo?: string;
  description?: string;
  descriptionKo?: string;
  image?: string;
  link?: string;
  outstanding?: boolean;
  view?: 0;
  type?: PostType;
}
