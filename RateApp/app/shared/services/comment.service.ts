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
        .map(data => {
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

    getComments(productId: string, page: number) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let searchParams = new URLSearchParams();
        searchParams.append('page', ""+page);
        
        let requestOptions = new RequestOptions({headers: headers, params: searchParams});

        return this.http.get(
            Config.apiUrl + "comment/" + productId,
            requestOptions
        )
        .map(response => response.json())
        .map(data => {
            let result = {};
            let comments = [];
            result["success"] = data.success;
            if(data.success) {
                data.comments.content.forEach((c) => {
                    let user = new User(c.createBy.name, c.createBy.username, null, null, null);
                    let comment = new Comment(c.id, c.date, c.text, c.stars, c.likesCount, c.dislikesCount, user, null);
                    comments.push(comment);
                });
                result["comments"] = comments;
                result["last"] = data.comments.last;
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