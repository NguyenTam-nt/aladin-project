import type { IFile } from "./file"

export interface ICategory {
    "id"?: number,
    "name": string,
    "nameKo": string,
    "parent": number
  }
   
export interface INews 
    {
      "createdBy"?: string,
      "createdDate"?: string,
      "lastModifiedBy"?: string,
      "lastModifiedDate"?: string,
      "id"?: number,
      "tilte": string,
      "tilteKo": string,
      "description": string,
      "descriptionKo": string,
      "content": string,
      "contentKo": string,
      "view"?: number,
      "newsCategory"?: ICategory,
      "files"?: IFile[]
    }
  