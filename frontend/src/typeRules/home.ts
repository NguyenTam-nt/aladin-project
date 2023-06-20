export enum HomeTopicType {
    "banner_home" = "HOME",
    "about" = "INTRODUCE",
    "book" = "BOOK",
    menu = "MENU",
    news = "NEWS",
    contact = "CONTACT",
    recruit  = "RECRUIT",
    video = "INTRODUCE_RESTAURANT",
    post = "INTRODUCE_SHORT",
    sales = "PROMOTION_HOT"
}

export interface ITopicType {
    type: HomeTopicType,
    listBanner: ITopicHome[]
}


export interface ITopicHome {
    id?: number | null,
    linkMedia?: string,
    title?: string,
    content?: string
    redirectUrl?: string
  }