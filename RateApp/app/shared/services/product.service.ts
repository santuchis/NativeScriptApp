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

	getProductsByTags(query: string, page: number) {
		let headers = new Headers();
		let searchParams = new URLSearchParams();
		searchParams.append('page', ""+page);
		let requestOptions = new RequestOptions({headers: headers, params: searchParams});
		
		return this.http.get(
			Config.apiUrl + "product/byTags/" + encodeURIComponent(query),
			requestOptions
		)
		.map(res => res.json())
		.catch(this.handleErrors);
		/*
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
		*/
	}

	getProductById(id : string) {
		let headers = new Headers();
		if(Config.token !== undefined) {
			headers.append("Authorization", "Bearer " + Config.token);
		}
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

	likeProduct(id: string) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);

		return this.http.get(Config.apiUrl + 'product/like/' + id, {
			headers: headers
		})
		.map(res => res.json())
		.map(data => {
			let result = {};
			result["success"] = data.success;
			return result;
		})
		.catch(this.handleErrors);
	}

	dislikeProduct(id: string) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);

		return this.http.get(Config.apiUrl + 'product/dislike/' + id, {
			headers: headers
		})
		.map(res => res.json())
		.map(data => {
			let result = {};
			result["success"] = data.success;
			return result;
		})
		.catch(this.handleErrors);
	}

	unlikeProduct(id: string) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);

		return this.http.get(Config.apiUrl + 'product/unlike/' + id, {
			headers: headers
		})
		.map(res => res.json())
		.map(data => {
			let result = {};
			result["success"] = data.success;
			return result;
		})
		.catch(this.handleErrors);
	}


	getLastSearchedProducts(){

	}

	saveSearchedProduct(id : string , productName : string){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);
    	return this.http.post(
      		Config.apiUrl + "user/search-product",
      		JSON.stringify({
				id: id,
				name: productName,
      		}),
      		{ headers: headers }
    	)
    	.catch(this.handleErrors);
	}

	getSearchedProducts(){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);
    	return this.http.get(Config.apiUrl + 'user/search-product', {
			headers: headers
		})
		.map(res => res.json())
		.map(data => {
			let result = {};
			let products = [];
			data.forEach((p) => {
			  products.push(new Product(p.productId, p.productName,null,null,null,null,null,null,null,null,null));
			});
			result["products"] = products;
			return result;
		})
		.catch(this.handleErrors);
	}

	deleteSearchedProduct(productId: string){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);
		return this.http.delete(
			Config.apiUrl + 'user/delete-product/'+productId, { headers: headers }
	  )
	  .catch(this.handleErrors);
	}

	getProductResutlPage(brand : string, page: number){
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);

        let searchParams = new URLSearchParams();
        searchParams.append('page', ""+page);
        
        let requestOptions = new RequestOptions({headers: headers, params: searchParams});

    	return this.http.get(Config.apiUrl + 'product/result-page/'+brand, requestOptions)
		.map(res => res.json())
		.map(data => {
	
			let result = {};
			let products : Array<Product> =  [];
			data.products.content.forEach((p) => {
			  products.push(new Product(p.id, p.name, p.brand, p.description, p.features, p.commentsCount, p.likesCount, p.dislikesCount, p.rate, p.createAt, p.images));
			});
			data.products.content.forEach((p) => {
				console.log("nombre"+p.name)
			});
			result["last"] = data.products.last
			result["products"] = products;
			return result;
		})
		.catch(this.handleErrors);
	}

	saveProduct(product: Product) {
		let tmpProd = {};
		tmpProd["name"] = product.name;
		tmpProd["brand"] = product.brand;
		tmpProd["description"] = product.description;
		tmpProd["features"] = product.features;
		tmpProd["images"] = product.images;
		if(product.id.length > 0) {
			tmpProd["id"] = product.id;
		}
		console.dir(product);
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);
    	return this.http.post(
			Config.apiUrl + "product/save", 
			JSON.stringify(tmpProd),
			{ headers: headers }
		)
		.map(response => response.json())
		.map(data => {
			let result = {};
			result["success"] = true;
			result["id"] = data.id;
			return result;
		})
		.catch(this.handleErrors);
	}

	handleErrors(error: Response) {
		console.log(JSON.stringify(error.json()));
		return Observable.throw(error);
	}
}