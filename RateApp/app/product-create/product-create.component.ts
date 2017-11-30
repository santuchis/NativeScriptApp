import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone } from "@angular/core";
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from "@angular/common/http";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { ImageSource, fromFile } from "image-source/image-source";
import { Observable } from "rxjs/Rx";

import { Product } from "../shared/model/product";
import { ProductService } from "../shared/services/product.service";
import { Config } from "../shared/config";

import * as imagepicker from "nativescript-imagepicker";

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
    public images2 = [{
        uploading:true,
        uploaded:false,
        error:false,
        fileName: 'IMG_0002',
        fileUri: 'file:///Users/guillermoaiquel/Library/Developer/CoreSimulator/Devices/96F8C779-2837-42B1-8700-B0904453A6DA/data/Media/DCIM/100APPLE/IMG_0002.JPG'
    }];
    private items = [];

    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private productService: ProductService, 
        private page: Page, private _changeDetectionRef: ChangeDetectorRef, private zone:NgZone, private http: HttpClient){
    };

    ngOnInit(): void {
        // Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    saveProduct() : void {
        this.productService.saveProduct(this.product)
            .subscribe(
                (result) => {
					if(result.success) {
                        this.product.id = result.id;
                        alert('Product saved.');
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
            setTimeout(()=> { _that.imageUpload(); }, 100);
        }).catch(function (e) {
            console.log(e);
        });
    }

    imageUpload() {
        for(let i = 0; i < this.images.length; i++) {
            if(!this.images[i].uploading && !this.images[i].uploaded) {
                let fileName : string = this.images[i].fileName;
                let fileUri : string = this.images[i].fileUri;
                console.log(fileUri);

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
                    console.log("chars:" + imageBase64.length);
                    let headers = new HttpHeaders();
                    headers.append("Content-Type", "application/json");
                    const body = {
                        upload_preset: "oolyrbp7",
                        file: "data:image/png;base64,"+imageBase64
                    };

                    const req = new HttpRequest('POST',
                        'https://api.cloudinary.com/v1_1/dxamsousk/image/upload',
                        body,
                        { reportProgress: false, headers: headers });
                    this.images[i].uploading = true;

                    this.http.request(req).subscribe(
                        () => {
                            console.log("Request started: " + fileName);
                        },
                        (error) => {
                            console.log("ERROR: " + JSON.stringify(error));
                            this.logEvent(fileName, "error");
                        },
                        () => {
                            console.log("Uploaded");
                            this.logEvent(fileName, "complete");
                        }
                    );
                } else {
                    console.log("File extension not supported");
                }
            }
        }
    }

    addImageToList(fileUri: string, uri: string) {
        let exists = false;
        for(let i = 0; i < this.images.length; i++) {
            if(this.images[i].fileUri === fileUri) {
                console.log("Image already exists on list");
                exists = true;
                break;
            }
        }
        if(!exists) {
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

    logEvent(fileName, status) {
        let i;
        for(i = 0; i < this.images.length; i++) {
            if(fileName === this.images[i].fileName) {
                break;
            }
        }
        switch (status) {
            case "complete":
                if(i < this.images.length) {
                    this.images[i].uploading = false;
                    this.images[i].uploaded = true;
                }
                break;
            case "error":
                if(i < this.images.length) {
                    this.images[i].uploading = false;
                    this.images[i].error = true;
                }
                break;
            default:
                break;
        }
        this._changeDetectionRef.detectChanges();
    }

}
