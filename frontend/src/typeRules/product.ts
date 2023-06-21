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

export interface CheckType {
  status: number;
  message: string;
  location: string;
}

export interface IListInfrastructure {
  id: number;
  name: string;
}

export enum MediaType {
  image = "IMAGE",
  video = "VIDEO",
}

export interface IListMedia {
  id: number;
  linkMedia: "string";
  type: MediaType;
}

export interface IProduct {
  id?: number | null;
  code: string;
  name: string;
  price: number;
  pricePromotion: number;
  description: string;
  idCategory?: number;
  listInfrastructure?: IListInfrastructure[];
  listMedia?: IListMedia[];
}
