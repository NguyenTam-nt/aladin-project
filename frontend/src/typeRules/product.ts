// {
//     "id": 0,
//     "code": "string",
//     "name": "string",
//     "price": 0,
//     "pricePromotion": 0,
//     "listInfrastructure": [
//       {
//         "id": 0,
//         "name": "string"
//       }
//     ],
//     "description": "string",
//     "idCategory": 0,
//     "listMedia": [
//       {
//         "id": 0,
//         "linkMedia": "string",
//         "type": "IMAGE"
//       }
//     ]
//   }

import type { ICategory, ICategoryItem } from "./category";

export interface CheckType {
  status: number;
  message: string;
  location: string;
}

export interface IListInfrastructure {
  id?: number;
  name?: string;
}

export enum MediaType {
  image = "IMAGE",
  video = "VIDEO",
}

export interface IListMedia {
  id?: number | null;
  linkMedia?: string;
  type?: MediaType;
}

export interface IProduct {
  id?: number | null;
  code: string;
  name: string;
  price: string;
  pricePromotion: string;
  description: string;
  percent?: number;
  category?: ICategoryItem;
  listInfrastructure?: IListInfrastructure[];
  listMedia?: IListMedia[];
  linkMedia?: string;
  priority?: boolean;
  show?: boolean;
  quantity?: number;
}


export interface IProductHome {
  category: ICategory,
  listProduct: IProduct[]
}