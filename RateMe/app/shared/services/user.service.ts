import * as base64 from "base-64";
import * as utf8 from "utf8";
import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "../model/user";
import { Config } from "../config";

@Injectable()
export class UserService {

	private isLogged : boolean = false;

	constructor(private http: Http) {}

	register(usr: User) {
		let headers = new Headers();
    	headers.append("Content-Type", "application/json");

    	return this.http.post(
      		Config.apiUrl + "user/register",
      		JSON.stringify({
				name: usr.name,
				username: usr.username,
				email: usr.email,
				password: usr.password,
				roles: usr.roles
      		}),
      		{ headers: headers }
    	)
    	.catch(this.handleErrors);
  	}

  	login(user: User) {
    	let headers = new Headers();
    	headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Basic " + base64.encode(utf8.encode("my-trusted-client:secret")));
		
		let searchParams = new URLSearchParams();
		searchParams.append('username', user.username);
		searchParams.append('password', user.password);
		searchParams.append('grant_type', "password");
		
		let requestOptions = new RequestOptions({headers: headers, params: searchParams});

		return this.http.post(
      		Config.apiUrl + "oauth/token",
			{},
      		requestOptions
    	)
    	.map(response => response.json())
    	.do(data => {
			  Config.token = data.access_token;
			  this.isLogged=true;
    	})
    	.catch(this.handleErrors);
	}

	me() {
		let headers = new Headers();
    	headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);

		return this.http.get(
				Config.apiUrl + "user/me",
				{ headers: headers}
			)
			.map(response => response.json())
			.do(data => {
				let user: User = new User(data.name, data.username, data.email, null, data.roles);
				console.dir(user);
				Config.user = user;
			})
			.catch(this.handleErrors);
	}
	
	handleErrors(error: Response) {
    	console.log("handleErrors : "+JSON.stringify(error.json()));
    	return Observable.throw(error.json());
	}
	  
	  getUserStatus() : boolean {
		  return this.isLogged;
	  }

}