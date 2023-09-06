import { ImageType } from "./category"
export interface Atribuite {
    valueVn:string,
    valueKr:string,
    attributeNameVn:string,
    attributeNameKr:string
 }
export interface ProductDetails {
    priceDetail: number,
    promoDetail: number,
    stockQuantity: number,
    addressWarehouse:string,
    images: ImageType[],
    attributes: Atribuite[]
 }

export interface ProductItem {
   productCode: string,
   productNameVn:string,
   productNameKr:string,
   categoryId?: number | null,
   subCategoryId?: number | null,
   cost: number,
   price: number,
   promo: number,
   stockQuantity: number,
   salientFeaturesVn:string,
   salientFeaturesKr:string,
   detailVn:string ,
   detailKr:string,
   specVn:string,
   specKr:string,
   featured: number,
   createAt?: string | null,
   warehouse: {
    address: string
 }[],
   productDetails: ProductDetails[]
}


