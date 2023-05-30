export enum BannerType{
    about = "ABOUT",
    news = "NEWS",
    notice = "NOTICE",
    file_document = "FILE_DOCUMENT",
    cadres = "CADRES",
    subject = "SUBJECT",
    library_image = "LIBRARY_IMAGE",
    library_video = "LIBRARY_VIDEO",
    login = "LOGIN",
    home = "HOME",
    bannerHomePost = "BANNER_HOME_POST",
    bannerParter = "BANNER_PAGE",
    bannerLogoParter = "BANNER_LOGO_PAGE",
    aboutBrochure = "ABOUT_BROCURE",
}

export interface IBanner {
  id?: number
  title?: string,
  titleKo?: string,
  type?: BannerType
  link?: string
}
