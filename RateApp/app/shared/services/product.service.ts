import * as base64 from "base-64";
import * as utf8 from "utf8";
import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Product } from "../model/product";

@Injectable()
export class ProductService {
	constructor(private http: Http) {};

	private productList2 : Product[] = [
		new Product("Apple iPhone 7"),
		new Product("Apple iPhone 7 Plus"),
		new Product("Apple iPhone 6"),
		new Product("Apple iPhone 6 Plus"),
		new Product("Samsung Galaxy 8"),
		new Product("Samsung Galaxy 8 Edge"),
	];

	getUserProducts() : Product[]{
		let productList : Product[] = [];
		for (var index = 0; index < 5; index++) {
			var product : Product = new Product("Producto "+index);
			productList.push(product);
		}
		return productList;
	}

	getProductsByName(name: string) : Product[] {
		return this.productList2.filter(prod => prod.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
	}

	getProductByName(productName : string) : Product[]{
		let productList : Product[] = [];		
		for (var index = 0; index < 5; index++) {
			var product : Product = new Product(productName+" "+index);
			productList.push(product);
		}
		return productList;
	}
}