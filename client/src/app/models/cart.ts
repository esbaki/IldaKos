import type { Product } from "./product";

export type Cart =  {
  cartId: string
  items: Item[]
}

export class Item {
  constructor(product:Product, quantity : number) {
    this.productId  = product.id;
    this.name = product.name;
    this.price = product.price;
    this.brand = product.brand;
    this.pictureUrl = product.pictureUrl;
    this.type = product.type;
    this.quantity = quantity;
    this.description = product.description;


  }

  productId: number
  name: string
  price: number
  pictureUrl: string
  brand: string
  type: string
  quantity: number
  description:string
}
