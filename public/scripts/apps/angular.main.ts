/// <reference path="../typings/angular2/angular2.d.ts"/>
/// <reference path="../services/Product.ts"/>
import 'reflect-metadata';
import {Component, View, NgFor, NgIf, bootstrap} from 'angular2/angular2';
import Product= require('../services/Product');

@Component({
  selector: 'app',
  appInjector: [Product.ProductService]
})
@View({
  template: `
    <p>{{name}}</p>
    <input id="new-product" #newproduct (keyup)="typing($event)">
    <button (click)="addProduct(newproduct.value)">Add</button>
    <ul>
      <li *ng-for="#product of products">
        {{ product.name }}
      </li>
    </ul>
  `,
  directives: [NgFor, NgIf]
})
class App {
  name: string;
  products: Array<Product.Product>;

  constructor(productService: Product.ProductService) {
    this.name = "Library Products";
    this.products = productService.products;
  }

  addProduct(newProduct: string) {
    this.products.push(new Product.Product(newProduct));
  }

  typing($event) {
    if($event.which == 13) {
      this.addProduct($event.target.value);
      $event.target.value = null;
    }
  }
}

bootstrap(App);