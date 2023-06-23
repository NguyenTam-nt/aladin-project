export interface ICommentChild {
  id?: number | null;
  fullname?: string;
  email?: string;
  rate?: number;
  content?: string;
  createdDate?: string
  idProduct?: number;
  idParent?: number;
  status?: boolean;
}

export interface IComment {
  id?: number | null;
  linkMedia?: string
  nameProduct?: string;
  description?: string
  commentAdmin?: ICommentChild
  commentGuest?: ICommentChild
  status: boolean
}
