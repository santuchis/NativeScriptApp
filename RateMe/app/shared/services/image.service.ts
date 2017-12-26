import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { ImageSource, fromFile, fromAsset } from "image-source/image-source";

import { Config } from "../config";

import { ImageAsset } from "image-asset";
import { Image } from "ui/image";
import imageSourceModule = require("image-source");

@Injectable()
export class ImageService {
	constructor(private http: Http) {};
    
    getFileExtension(fileUri: string) {
        return fileUri.slice(fileUri.lastIndexOf('.') + 1).toLowerCase();
    }

    upload(image: any) {
        let fileName : string = image.fileName;
        let fileUri : string = image.fileUri;

        let imageSource: ImageSource = fromFile(fileUri.replace('file://', ''));
        let fileExtension = this.getFileExtension(fileUri);

        // var progress:Progress =<Progress> this.page.getViewById(fileName + "progress");
        // progress.value = 0;

        if(fileExtension === "png" || fileExtension === "jpeg" || fileExtension === "jpg") {
            // le puse imageSource.toBase64String(fileExtension); pero con 'jpg' devuelve null
            // la calidad no se reduce nunca, los valores son de 0 a 100
            image.width = imageSource.width;
            image.height = imageSource.height;
            let imageBase64 = imageSource.toBase64String(fileExtension, 20);
            if(imageBase64 === null && fileExtension === "jpg") {
                console.log("jpg returned null");
                imageBase64 = imageSource.toBase64String("jpeg", 20);
                console.log("quality 10 chars: " + imageSource.toBase64String("jpeg", 10).length);
                console.log("quality 20 chars: " + imageSource.toBase64String("jpeg", 20).length);
                console.log("quality 40 chars: " + imageSource.toBase64String("jpeg", 40).length);
                console.log("quality 80 chars: " + imageSource.toBase64String("jpeg", 80).length);
                console.log("quality 100 chars: " + imageSource.toBase64String("jpeg", 100).length);
                if(imageBase64 === null) {
                    console.log("jpeg returned null");
                    imageBase64 = imageSource.toBase64String("png", 20);
                }
            }
            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            const body = {
                upload_preset: "oolyrbp7",
                file: "data:image/png;base64,"+imageBase64
            };

            return this.http.post(
                'https://api.cloudinary.com/v1_1/dxamsousk/image/upload',
                JSON.stringify(body),
                { headers: headers }
            )
            .map(response => response.json())
            .map(data => {
                return data;
            })
            .catch(this.handleErrors);
        } else {
            console.log("File extension not supported");
        }
    }

	handleErrors(error: Response) {
		console.log(JSON.stringify(error.json()));
		return Observable.throw(error);
	}
}