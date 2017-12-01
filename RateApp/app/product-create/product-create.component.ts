import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone } from "@angular/core";
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { ImageSource, fromFile, fromAsset } from "image-source/image-source";
import { Observable } from "rxjs/Rx";

import { Product } from "../shared/model/product";
import { ProductService } from "../shared/services/product.service";
import { Config } from "../shared/config";

import * as imagepicker from "nativescript-imagepicker";
import * as camera from "nativescript-camera";

import { ImageAsset } from "image-asset";
//import { fromAsset } from "image-source";
import { Image } from "ui/image";
import imageSourceModule = require("image-source");

// import {Progress} from "ui/progress";


@Component({
    selector: "ProductCreate",
    moduleId: module.id,
    styleUrls: ["./product-create-common.component.css", "./product-create.component.css"],
    templateUrl: "./product-create.component.html",
    providers: [ProductService]
})
export class ProductCreateComponent implements OnInit {

    // Component Variables
    private product: Product = new Product('', '', '', '', '', 0, 0, 0, 0, 0, ['']);
    public images = [];
    public imagesTesting = [{
        uploading:true,
        uploaded:false,
        error:false,
        fileName: 'IMG_0002',
        fileUri: 'file:///Users/guillermoaiquel/Library/Developer/CoreSimulator/Devices/96F8C779-2837-42B1-8700-B0904453A6DA/data/Media/DCIM/100APPLE/IMG_0002.JPG'
    }];
    private items = [];
    public cameraImages: Array<any>;
    public img ;  

    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private productService: ProductService, 
        private page: Page, private _changeDetectionRef: ChangeDetectorRef, private zone:NgZone, private http: Http){
    };

    ngOnInit(): void {
        // Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    saveProduct() : void {
        let imagesUploading = 0;
        let imagesError = 0;
        this.product.images = [];
        for(let i = 0; i < this.images.length; i++) {
            if(this.images[i].uploading) {
                imagesUploading++;
            } else if(this.images[i].error) {
                imagesError++;
            }
            this.product.images.push(this.images[i].fileUrl);
        }
        if(imagesError > 0) {
            alert('There are images that failed to upload');
            return;
        }
        if(imagesUploading > 0) {
            alert('There are images still uploading');
            return;
        }
        this.productService.saveProduct(this.product)
            .subscribe(
                (result) => {
					if(result.success) {
                        this.product.id = result.id;
                        this.router.navigate(["/product/" + this.product.id], { clearHistory: true });
                    } else {
                        alert('Error while saving product, please try again');
                    }
				},
				(error) => {
					alert('Unexpected error, please try again');
					console.dir(error);
				}
            );
    }

    goBack() {
        this.router.backToPreviousPage();
    }

    /****************
     * Side Drawer methods
     ***************/
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    
    onSelectMultipleTap() {
        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    onSelectSingleTap() {
        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    startSelection(context) {
        let _that = this;

        context
        .authorize()
        .then(() => {
            console.log("then 1.");
            _that.items = [];
            return context.present();
        })
        .then((selection) => {
            console.log("then 2.");
            _that.items = selection;
            selection.forEach(element => {
                _that.addImageToList(element.fileUri, element.uri);
            });
            _that._changeDetectionRef.detectChanges();
            setTimeout(()=> { _that.uploadImages(); }, 100);
        }).catch(function (e) {
            console.log(e);
        });
    }

    upload(i: number) {
        let fileName : string = this.images[i].fileName;
        let fileUri : string = this.images[i].fileUri;

        let imageSource: ImageSource = fromFile(fileUri.replace('file://', ''));
        let fileExtension = this.getFileExtension(fileUri);

        // var progress:Progress =<Progress> this.page.getViewById(fileName + "progress");
        // progress.value = 0;

        if(fileExtension === "png" || fileExtension === "jpeg" || fileExtension === "jpg") {
            // le puse imageSource.toBase64String(fileExtension); pero con 'jpg' devuelve null
            // la calidad no se reduce nunca, los valores son de 0 a 100
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

            this.images[i].uploading = true;
            this.images[i].uploaded = false;
            this.images[i].error = false;

            this.http.post(
                'https://api.cloudinary.com/v1_1/dxamsousk/image/upload',
                JSON.stringify(body),
                { headers: headers }
            )
            .map(response => response.json())
            .map(data => {
                this.logEvent(fileName, "complete", data.secure_url);
            })
            .catch(this.handleErrors)
            .subscribe(
                () => {
                    console.log("Request started: " + fileName);
                },
                (error) => {
                    console.log("ERROR: " + JSON.stringify(error));
                    this.logEvent(fileName, "error", '');
                },
                () => {
                    console.log("Uploaded");
                }
            );
        } else {
            console.log("File extension not supported");
        }
    }

    uploadImages() {
        for(let i = 0; i < this.images.length; i++) {
            if(!this.images[i].uploading && !this.images[i].uploaded) {
                this.upload(i);
            }
        }
    }

    addImageToList(fileUri: string, uri: string) {
        for(let i = 0; i < this.images.length; i++) {
            if(this.images[i].fileUri === fileUri) {
                console.log("Image already exists on list");
                return;
            }
        }
        let obj = {
            fileUri: fileUri,
            uri: uri,
            fileName: this.getImageName(fileUri),
            uploading: false,
            uploaded: false,
            error: false
        };
        this.images.push(obj);
    }

    getImageName(fileUri: string) {
        let name = fileUri;
        name = name.slice(name.lastIndexOf('/') + 1);
        name = name.slice(0, name.lastIndexOf('.'));
        return name;
    }

    getFileExtension(fileUri: string) {
        return fileUri.slice(fileUri.lastIndexOf('.') + 1).toLowerCase();
    }

    removeImage(index: number) {
        this.images.splice(index, 1);
    }

    logEvent(fileName, status, fileUrl) {
        let i;
        for(i = 0; i < this.images.length; i++) {
            if(fileName === this.images[i].fileName) {
                break;
            }
        }
        if(i >= this.images.length) {
            console.log("Image uploaded was removed by user");
            return;
        }
        switch (status) {
            case "complete":
                this.images[i].uploading = false;
                this.images[i].uploaded = true;
                this.images[i].fileUrl = fileUrl;
                break;
            case "error":
                this.images[i].uploading = false;
                this.images[i].error = true;
                break;
        }
        this._changeDetectionRef.detectChanges();
    }

    takePicture(){
        camera.requestPermissions();
        var options = {width: 1280, keepAspectRatio: true, saveToGallery: true};
        camera.takePicture(options).then((imageAsset) => {
            console.log("Photo has been taken Ok!");
        })
        .catch((err) => {
            console.log("Error -> " + err.message);
        });
    } 
    handleErrors(error: Response) {
    	console.log(JSON.stringify(error.json()));
    	return Observable.throw(error);
    }

}
