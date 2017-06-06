import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user";
import { Config } from "../config";

@Injectable()
export class UserService {

	users: Array<User> = [];

	constructor(private http: Http) {
		this.users.push(new User('guille@ns.com','qwerty'));
		this.users.push(new User('santi@ns.com','qwerty'));
	}

	register(usr: User) {
		let tmp:Array<User> = this.users.filter(user => user.email === usr.email);
		if(tmp.length !== 0) {
			return {success: false, msg: 'El email ya se encuentra registrado'};
		}
		this.users.push(usr);
		Config.token = "sad";
		return {success: true, msg: 'Usuario registrado'};
		
		/*
		let headers = new Headers();
    	headers.append("Content-Type", "application/json");

    	return this.http.post(
      		Config.apiUrl + "Users",
      		JSON.stringify({
				Username: user.email,
				Email: user.email,
				Password: user.password
      		}),
      		{ headers: headers }
    	)
    	.catch(this.handleErrors);
		*/
  	}

  	login(usr: User) {
		let tmp:Array<User> = this.users.filter(user => user.email === usr.email);
		if(tmp.length > 0 && tmp[0].password == usr.password) {
			Config.token = "sad";
			return {success: true, msg: 'Login correcto'};
		}
		return {success: false, msg: 'Usuario y contraseña incorrectos'};
		/*
    	let headers = new Headers();
    	headers.append("Content-Type", "application/json");

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