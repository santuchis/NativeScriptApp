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

	saveComment(productId: string, commentId: string, commentText: string, stars: number) {
		let headers = new Headers();
        headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);
		let comment = {};
		comment['text'] = commentText;
		comment['stars'] = stars;
		if(commentId && commentId.length > 0) {
			comment['id'] = commentId;
		}

    	return this.http.post(
      		Config.apiUrl + "comment/save/" + productId,
      		JSON.stringify(comment),
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
        if(Config.token !== undefined) {
			headers.append("Authorization", "Bearer " + Config.token);
		}

        let searchParams = new URLSearchParams();
        searchParams.append('page', ""+page);
        
        let requestOptions = new RequestOptions({headers: headers, params: searchParams});

        return this.http.get(
            Config.apiUrl + "comment/" + productId,
            requestOptions
        )
        .map(response => response.json())
        .catch(this.handleErrors);
	}
	
	getComment(productId: string) {
		let headers = new Headers();
        headers.append("Content-Type", "application/json");
        if(Config.token !== undefined) {
			headers.append("Authorization", "Bearer " + Config.token);
		}

        let requestOptions = new RequestOptions({headers: headers});

        return this.http.get(
            Config.apiUrl + "comment/user/" + productId,
            requestOptions
        )
        .map(response => response.json())
        .catch(this.handleErrors);
	}

    likeComment(id: string) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);

		return this.http.get(Config.apiUrl + 'comment/like/' + id, {
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

	dislikeComment(id: string) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);

		return this.http.get(Config.apiUrl + 'comment/dislike/' + id, {
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

	unlikeComment(id: string) {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + Config.token);

		return this.http.get(Config.apiUrl + 'comment/unlike/' + id, {
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
      
	handleErrors(error: Response) {
    	console.log(JSON.stringify(error.json()));
    	return Observable.throw(error);
    }
}