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
	private productList : Product[] = [];

	getUserProducts() : Product[]{
		for (var index = 0; index < 5; index++) {
			var product : Product = new Product("Producto "+index);
			this.productList.push(product);
		}
		return this.productList;
	}

	getProductByName(productName : string) : Product[]{
		for (var index = 0; index < 5; index++) {
			var product : Product = new Product(productName+" "+index);
			this.productList.push(product);
		}
		return this.productList;
	}
}