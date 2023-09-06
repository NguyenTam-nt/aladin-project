export interface ImageType {
  url: string;
}
export interface SubCategory {
  id?: number;
  subCategoryNameVn: string;
  subCategoryNameKr?: string;
  noteSubVn: string;
  noteSubKr: string;
  imagesSubcategory: ImageType[];
}

export interface CategoryType {
  id?: number;
  categoryNameVn: string;
  categoryNameKr?: string;
  subCategoryList: SubCategory[];
  imagesCategory: ImageType[];
}
