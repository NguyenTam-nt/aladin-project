export enum CategoryType {
  parent = "PARENT",
  child = "CHILD",
}
export enum CategoryMenuType {
  kitchen = "KITCHEN",
  bar = "BAR",
}

export interface ICategoryItem {
  id?: number | null;
  name: string;
  linkMedia: string;
  file?: File | null
}

export interface ICategory {
  id?: number | null;
  name?: string;
  isHome?: boolean;
  isMenu?: CategoryMenuType;
  type?: CategoryType;
  idParent?: CategoryType;
  listCategoryChild?: ICategoryItem[];
}
