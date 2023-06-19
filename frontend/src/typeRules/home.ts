export enum HomeTopicType {
    video = "INTRODUCE_RESTAURANT",
    post = "INTRODUCE_SHORT",
    sales = "PROMOTION_HOT"
}

export interface ITopicType {
    type: HomeTopicType,
    listBanner: ITopicHome[]
}


export interface ITopicHome {
    id?: number,
    linkMedia?: string,
    title?: string,
    content?: string
    redirectUrl?: string
  }