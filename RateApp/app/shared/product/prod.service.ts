import * as base64 from "base-64";
import * as utf8 from "utf8";
import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Product } from "./product";
import { Config } from "../config";

@Injectable()
export class UserService {

    private products : Array<Product> = [
        new Product("1", "iPhone 7", "Apple"),
        new Product("2", "iPhone 7 Plus", "Apple"),
        new Product("3", "Galaxy s8", "Samsung"),
        new Product("4", "Galaxy s8 Edge", "Samsung"),
        new Product("5", "Play Station 4", "Sony"),
        new Product("6", "XBox One", "Microsoft")
    ];
	constructor(private http: Http) {}

	get(id: String) : Product {
        return this.products.find(p => p.id === id);
  	}
	
	handleErrors(error: Response) {
    	console.log(JSON.stringify(error.json()));
    	return Observable.throw(error);
  	}

}