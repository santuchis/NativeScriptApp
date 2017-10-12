import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "../model/user";
import { Product } from "../model/product";
import { Comment } from "../model/comment";
import { Config } from "../config";

@Injectable()
export class CommentService {

	constructor(private http: Http) {}

	saveComment(productId: string, commentText: string, stars: number) {
		let headers = new Headers();
        headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);

    	return this.http.post(
      		Config.apiUrl + "comment/save/" + productId,
      		JSON.stringify({
				text: commentText,
				stars: stars
      		}),
      		{ headers: headers }
        )
        .map(response => response.json())
        .do(data => {
            let result = {};
            result["success"] = data.success;
            if(data.success) {
                let comment = new Comment(
                    data.comment.id,
                    data.comment.date,
                    data.comment.text,
                    data.comment.stars,
                    data.comment.likesCount,
                    data.comment.dislikesCount,
                    null,
                    null);
                result["comment"] = comment;
            }
            return result;
        })
    	.catch(this.handleErrors);
		
    }
      
	handleErrors(error: Response) {
    	console.log(JSON.stringify(error.json()));
    	return Observable.throw(error);
    }
}