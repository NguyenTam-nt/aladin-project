export enum CategoryType {
  parent = "PARENT",
  child = "CHILD",
}
export enum CategoryMenuType {
  kitchen = "KITCHEN",
  bar = "BAR",
}

export interface ICategoryItem {
  id?: number | null
  name: string
  linkMedia: string
  type?: CategoryType
  file?: File | null
  idParent?: number
}

export interface ICategory {
  id?: number | null
  name?: string
  isHome?: boolean
  isMenu?: CategoryMenuType
  type?: CategoryType
  listCategoryChild?: ICategoryItem[]
  idParent?: number
}
