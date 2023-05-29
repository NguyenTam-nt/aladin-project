import type { IFile } from "./file";

export enum ContentType {
    general = "GENERAL",
    brand = "BRAND",
}

export interface IContent {
  createdBy?: string
  createdDate?: string
  id?: number
  type?: ContentType
  category?: string
  categoryKo?: string
  title?: string
  titleKo?: string
  content?: string
  contentKo?: string
  files?: IFile[]
}
