export class Product {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

export class ProductService {
  products: Array<Product>;

  constructor() {
    this.products = [
      new Product("Guitar Tuner"),
      new Product("Email.Next")
    ];
  }
}