import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user";
import { Config } from "../config";

@Injectable()
export class UserService {
	constructor(private http: Http) {}

	register(usr: User) {
		let headers = new Headers();
    	headers.append("Content-Type", "application/json");

    	return this.http.post(
      		Config.apiUrl + "users",
      		JSON.stringify({
				email: usr.email,
				password: usr.password
      		}),
      		{ headers: headers }
    	)
    	.catch(this.handleErrors);
		
  	}

  	login(usr: User) {
    	let headers = new Headers();
    	headers.append("Content-Type", "application/json");
		let searchParams = new URLSearchParams();
		searchParams.append('email', usr.email);
		let requestOptions = new RequestOptions({headers: headers, params: searchParams});

		return this.http.get(Config.apiUrl + "users/search/findByEmail", requestOptions)
    	.map(response => response.json()._embedded)
    	.do(data => {
			if(data.users[0] && data.users[0].password === usr.password) {
				Config.token = "fakeToken";//data.Result.access_token;
			} else {
				console.log("login FAIL");
			}
    	})
    	.catch(this.handleErrors);

		/*
		return this.http.post(
      		Config.apiUrl + "oauth/token",
      		JSON.stringify({
        		username: user.email,
        		password: user.password,
        		grant_type: "password"
      		}),
      		{ headers: headers }
    	)
    	.map(response => response.json())
    	.do(data => {
      		Config.token = data.Result.access_token;
    	})
    	.catch(this.handleErrors);
		*/
  	}
	
	handleErrors(error: Response) {
    	console.log(JSON.stringify(error.json()));
    	return Observable.throw(error);
  	}

}