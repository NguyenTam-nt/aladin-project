export interface Image {
    url: string
}
export interface SubCategory {
    id?: number,
    subCategoryNameVn: string,
    subCategoryNameKr?: string,
    noteSubVn: string,
    noteSubKr: string,
    imagesSubcategory:Image[]
}

export interface CategoryType {
    id?: number,
    categoryNameVn: string,
    categoryNameKr?: string,
    subCategoryList: SubCategory[] 
    imagesCategory: Image[]
         
}
