import { ListProductType, Product, SomeType } from "commons/contannt";
import queryString from "query-string";
import api from "./api";
import { Params } from "@utility/typeService";
import { IRespone } from "./Types/respone";

const apiItems = "/items";
const pathRemainning = '/filterremaining';
const apiProduct = "/products";

export type ProductTrademark = {
    id: string,
    name: string,
    image: string,
    menuShow: true,
    male: null,
    female: null
}

export type ProductCategory = {
    categoryId: number
    categoryName: string
    categorySId: number
    createdAt: number
    hasChild: boolean
    parentId: number
    parentSId: number
}

export type ProductSize = {
    sizeName: string,
    sale: number,
    priceSale: number,
    total: number
}

export type ProductColor = {
    colorName: string,
    colorCode: string,
    image: string,
    sizes: ProductSize[]
}

export type ProductItem = {
    id: string,
    images: string[],
    video: string,
    price: number,
    sku: string,
    name: string,
    detail: string,
    policy: string,
    category: ProductCategory,
    trademark: ProductTrademark,
    colors: ProductColor[],
    imageCheck: string,
    seen: number,
    sold: number,
    priceMin: number,
    priceMax: number,
    saleMin: number,
    saleMax: number,
    createdAt: number,
    updatedAt: number
}

export type ResponseProductItems = {
    status: string,
    data: ProductItem[],
    total: number
}
type ResponseProductItem = {
    status: string,
    data: ProductItem,
    total: number
}

const ProductServices = {
    getProductDetail: async (id: string): Promise<ProductItem> => {
        return api.get(apiItems + "/id/" + id).then(data => data.data)
    },
    getSale: async (): Promise<ResponseProductItems> => {
        return api.get(apiItems + "?sort=sale,desc&gender=nam,nữ").then(data => data.data)
    },
    getHotSold: async (): Promise<ResponseProductItems> => {
        return api.get(apiItems + "?sort=sold,desc&gender=nam,nữ").then(data => data.data)
    },
    getProductNew: async (): Promise<ResponseProductItems> => {
        return api.get(apiItems + "?sort=createdAt,desc&gender=nam,nữ").then(data => data.data)
    },
    getListNewProducts: async (params: Params): Promise<ResponseProductItems> => {
        const result = (await api.get(apiItems, { params: params })).data;
        return result
        // return (await api.get(apiItems + "?sort=createdAt,desc&gender=nam,nữ", {params: {page: page, size}})).data.data
    },

    getProductSeenMost: async (): Promise<ResponseProductItems> => {
        return api.get(apiItems + "?sort=seen,desc").then(data => data.data)
    },
    getProductRelated: async (categorySId: number): Promise<ResponseProductItems> => {
        return api.get("/itemsrelate?categorySId=" + categorySId).then(data => data.data)
    },
    searchHeader: async (params: { keyword: string, page: number, size: number }): Promise<ResponseProductItems> => {
        return api.get(apiItems + "/search", { params: params }).then(data => data.data)
    },
    addProduct: async (data: any): Promise<any> => {
        const result = (await api.post(apiItems, data))
        return result.data
    },
    getProductById: async (id: string): Promise<Product> => {
        const result = await api.get(apiItems + "/id/" + id)
        return result.data
    },
    putProducById: async (id: string, data: any): Promise<Product> => {
        const result = await api.put(`${apiItems}/${id}`, data)
        return result.data
    },
    getListProduct: async (param: SomeType): Promise<ListProductType> => {
        const result = await api.get(`${apiItems}?${queryString.stringify(param, { arrayFormat: "comma" })}`)
        return result.data
    },
    getListProductFilter: async (param: SomeType) => {
        const result = await api.get(`${pathRemainning}?${queryString.stringify(param)}`)
        return result.data;
    },
    getProductInVoucher: async (data: number[]): Promise<ListProductType> => {
        const result = await api.post('/itemslistid', data);
        return result.data
    },
    deleteProducts: async (arr: number[]): Promise<any> => {
        const result = await api.delete(`${apiItems}?${queryString.stringify({ ids: arr }, { arrayFormat: "comma", skipNull: true })}`)
        return result
    },
    getAllProducts: async (params?: any): Promise<IRespone> => {
        return api.get(apiProduct, { params })
    },
    findProductById: async (id: any): Promise<IRespone> => {
        return api.get(`${apiProduct}/${id}`);
    }


}


export default ProductServices;