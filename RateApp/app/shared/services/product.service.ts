import * as base64 from "base-64";
import * as utf8 from "utf8";
import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Product } from "../model/product";
import { Config } from "../config";

@Injectable()
export class ProductService {
	constructor(private http: Http) {};
	private images : string[] = ["~/images/img1.jpg","~/images/img2.jpg","~/images/img3.jpg"];

	private productList2 : Product[] = [];

	/*
		new Product("57c4c8bad00f4038570041b0","iPhone 7","Apple", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041b1","iPhone 7 Plus","Apple", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041b2","iPhone 6","Apple", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041b3","iPhone 6 Plus","Apple", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041b4","Galaxy 8","Samsung", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041b5","Galaxy 8 Edge","Samsung", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041b6","Galaxy J7 Long Name Very Long Name","Samsung", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041b7","G5","Motorola", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041b8","Galaxy J2 Prime","Samsung", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041b9","S60","Caterpillar", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041c0","Galaxy J5 Prime","Samsung", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
		new Product("57c4c8bad00f4038570041c1","K10","LG", "Pellentesque lorem sem, scelerisque vel rhoncus sed, imperdiet ac odio. Curabitur gravida dui in consectetur tincidunt. Nullam non interdum ipsum, a ornare arcu. Pellentesque venenatis consectetur metus. Sed id purus id libero placerat ultrices et at est. Suspendisse aliquet euismod libero lacinia feugiat. Nunc vulputate tincidunt neque ac cursus. Quisque et orci et purus consequat sagittis. Nunc fringilla sollicitudin leo et fringilla. Donec elit dui, tempor eu felis sodales, placerat mollis nibh. Fusce at porttitor lectus, eu pulvinar elit. Ut lectus magna, feugiat vel aliquam eget, eleifend vitae eros. Nam sapien quam, tincidunt eget auctor eget, iaculis id mauris. Donec sed mauris ut lacus vestibulum rhoncus in id metus. Quisque in sollicitudin quam. In eu porttitor urna.", this.images),
	*/

	getUserProducts() : Product[]{
		let productList : Product[] = [];
		//for (var index = 3; index < 10; index++) {
		//	productList.push(this.productList2[index]);
		//}
		return productList;
	}

	getProductsByName(name: string) {
		let headers = new Headers();
		return this.http.get(Config.apiUrl + "product/byName/" + encodeURIComponent(name), {
		  headers: headers
		})
		.map(res => res.json())
		.map(data => {
		  let result = {};
		  let products = [];
		  data.products.forEach((p) => {
			products.push(new Product(p.id, p.name, p.brand, p.description, p.features, p.commentsCount, p.likesCount, p.dislikesCount, p.rate, p.createAt, p.images));
		  });
		  result["count"] = data.count;
		  result["products"] = products;
		  return result;
		})
		.catch(this.handleErrors);
	}

	getProductById(id : string) {
		let headers = new Headers();
		return this.http.get(Config.apiUrl + "product/" + id, {
		  headers: headers
		})
		.map(res => res.json())
		.map(data => {
		  let result = {};
		  let p = data.product;
		  result["product"] = new Product(p.id, p.name, p.brand, p.description, p.features, p.commentsCount, p.likesCount, p.dislikesCount, p.rate, p.createAt, p.images);
		  result["likes"] = data.likes;
		  return result;
		})
		.catch(this.handleErrors);
		//return this.productList2.find(p => p.id === id);
	}

	handleErrors(error: Response) {
		console.log(JSON.stringify(error.json()));
		return Observable.throw(error);
	}
}