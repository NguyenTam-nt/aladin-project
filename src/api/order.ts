export interface IProductOrder {
  orderId?: number;
  productNameVn: 'string';
  productNameKr: 'string';
  productDetailId: number;
  quantityOder: number;
  actualPrice: number;
  price: number;
  addressWarehouse: 'string';
  image: 'string';
}
