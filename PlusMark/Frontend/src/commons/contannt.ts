
export const ThVoucher = [
    'Mã voucher',
    'Tên chương trình',
    'Giảm giá',
    'Tổng voucher',
    'Lượt đã sử dụng',
    'Trạng thái',
    'Thao tác'
]

export const tableColor = [
    '#000000', 
    '#0000FF',  
   '#008000',
   '#A52A2A', 
   '#FF0000', 
   '#FFFFFF', 
   '#FFA500', 
   '#FFFF00', 
   '#808080',
   '#EE82EE',
   '#FFC0CB',

]
export interface paramType {page:number,size:number, sort: string | null}
export interface paramVoucher {page:number,size:number, status: string | null}
export interface paramOrder extends  paramType{
    startDate: number,
    endDate: number,
}
export interface SomeType {
    [key: string]:  string | any
}
export interface SizeType {
    name: string,
    price: number | string,
    quantity: number | string,
    discount: number | string,
}

export interface ProductItemSize {
        colorName: string,
        colorCode: string,
        image: string,
        sizes:  {
            sizeName: string,
            sale: number,
            priceSale: number,
            total: number,
          }[]
}

export interface  Product {
    id?:number,
    sku: string,
    name: string,
    images:string[],
    video:string,
    detail: string,
    policy: string,
    price: number,
    cost: number,
    imageCheck: string,
    seen?: number,
    sold?: number,
    remaining?: number,
    saleMin?: number,
    saleMax?: number,
    gender: null | string[],
    category: {
        categorySId: number | null,
        parentSId: number | null,
        categoryId: number | null,
        parentId: number | null,
        categoryName: string,
        hasChild?: boolean,
        createdAt?: number | null,
        updateAt?: number | null,
    },
    trademark: TradeMarkType,
    colors:{
        colorName: string,
        colorCode: string,
        image: string,
        sizes: [
          {
            sizeName: string,
            sale: number,
            priceSale: number,
            total: number,
          },
        ],
      }[],
}
export interface ListProductType  {
    status: string,
    data: Product[],
    total: number
}

// interface Redux type

export interface CategoryType {
    id: string,
    name: string,
    genders: string[],
    categoryDetails: {id:string,name: string}[]
}
export interface categoryType{
    categorySId: number,
    parentSId: number | null,
    categoryId: number,
    parentId:  number | null,
    categoryName:string,
    hasChild: boolean,
    createdAt: number | null,
    updateAt: number | null,
}
export interface RootCategory extends categoryType {
    children: {
        categorySId: number,
        parentSId: number | null,
        categoryId: number,
        parentId:  number | null,
        categoryName:string,
        hasChild: boolean,
        createdAt: number | null,
        updateAt: number | null,
        children:RootCategory[]
    } []
}
export interface lisCategoryType {
    status: string,
    data: RootCategory[],
    total: number
} 
export interface lisTradeMarkType {
    status: string,
    data: TradeMarkType[],
    total: number
} 
export interface TradeMarkType  {
    id: string | number,
    name: string,
    images: string[],
    menuShow: boolean,
    products?:[]

}

export interface VoucherType {
    id: string,
    name: string,
    sku: string,
    startTime: number,
    endTime: number,
    moneyVoucher: number,
    minPayment: number,
    total: number,
    voucherUsed: number,
    status: 'before' | 'running' | 'end',
    itemsIdList: number[],
}
export interface ListVoucherType {
    status: string,
    data: VoucherType[],
    total: number
}


export interface itemCard 
    {
        itemId:string,
        itemName:string,
        image: null| string,
        size:string,
        color:string,
        price: number,
        total: number
     }
interface customer {
    fullname:string,
    phoneNumber:string,
    email:string,
    address:string,
    province:string,
    district:string,
    commune:string
}
export interface OrderType {
           id: string,
           sku: string,
           itemsCartList:itemCard [],
           customerId:string,
           voucher: null | string,
           paymentMethod:string,
           customer:customer,
           moneyVoucher: number,
           total: number,
           createdAt: number
}
export interface ListOrdersType {
    status: string,
    data: OrderType[],
    total: number
}

export interface ContactType {
    id: string,
    fullName: string,
    phoneNumber: string,
    email:string,
    content: string,
    status: boolean,
    reply:  null | string
}
export interface listContactType {
    status: string,
    data: ContactType[],
    total: number
}

export interface TranslateType {
    result: string
}

