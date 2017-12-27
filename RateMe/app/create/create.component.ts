import * as application from "application";
import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { Observable } from "rxjs/Rx";

import { Product } from "../shared/model/product";
import { ProductService } from "../shared/services/product.service";
import { ImageService } from "../shared/services/image.service";
import { Config } from "../shared/config";

import * as imagepicker from "nativescript-imagepicker";
import * as camera from "nativescript-camera";
import { GC } from "tns-core-modules/utils/utils";

// import {Progress} from "ui/progress";

@Component({
    selector: "Create",
    moduleId: module.id,
    styleUrls: ["./create-common.component.css", "./create.component.css"],
    templateUrl: "./create.component.html",
    providers: [ProductService, ImageService]
})
export class CreateComponent implements OnInit {

    // Component Variables
    private editingDescription: boolean = false;
    private editingFeatures: boolean = false;
    private tmpDescription: string = "";
    private tmpFeatures: string = "";
    private product: Product = new Product('', '', '', '', '', 0, 0, 0, 0, 0, ['']);
    public images = [];
    public imagesX = [
    {
        uploading:true,
        uploaded:false,
        error:false,
        fileName: 'IMG_0001',
        fileUri: 'file:///Users/guillermoaiquel/Library/Developer/CoreSimulator/Devices/DA30E910-68B2-4C30-8881-1E8FC489D1B2/data/Media/DCIM/100APPLE/IMG_0001.JPG',
        fileUrl: ''
    },
    {
        uploading:false,
        uploaded:false,
        error:true,
        fileName: 'IMG_0002',
        fileUri: 'file:///Users/guillermoaiquel/Library/Developer/CoreSimulator/Devices/DA30E910-68B2-4C30-8881-1E8FC489D1B2/data/Media/DCIM/100APPLE/IMG_0002.JPG',
        fileUrl: ''
    },
    {
        uploading:false,
        uploaded:true,
        error:false,
        fileName: 'IMG_0003',
        fileUri: 'file:///Users/guillermoaiquel/Library/Developer/CoreSimulator/Devices/DA30E910-68B2-4C30-8881-1E8FC489D1B2/data/Media/DCIM/100APPLE/IMG_0003.JPG',
        fileUrl: ''
    },
    {
        uploading:false,
        uploaded:true,
        error:false,
        fileName: 'IMG_0004',
        fileUri: 'file:///Users/guillermoaiquel/Library/Developer/CoreSimulator/Devices/DA30E910-68B2-4C30-8881-1E8FC489D1B2/data/Media/DCIM/100APPLE/IMG_0004.JPG',
        fileUrl: ''
    },
    {
        uploading:false,
        uploaded:true,
        error:false,
        fileName: 'IMG_0005',
        fileUri: 'file:///Users/guillermoaiquel/Library/Developer/CoreSimulator/Devices/DA30E910-68B2-4C30-8881-1E8FC489D1B2/data/Media/DCIM/100APPLE/IMG_0005.JPG',
        fileUrl: ''
    }
    ];
    private items = [];
    public cameraImages: Array<any>;
    public img ;  

    constructor(private router: RouterExtensions, private productService: ProductService, 
        private page: Page, private _changeDetectionRef: ChangeDetectorRef, private imageService: ImageService){
    };

    editDescription(): void {
        if(!this.editingDescription) {
            this.tmpDescription = this.product.description;
            this.editingDescription = true;
        }
    }

    editFeatures(): void {
        if(!this.editingFeatures) {
            this.tmpFeatures = this.product.features;
            this.editingFeatures = true;
        }
    }

    ngOnDestroy() {
        this.garbageCollector();
    }

    garbageCollector() {
        if(application.android) {
            console.log("Garbage Collector called.");
            GC();
        }
    }

    saveProduct() : void {
        if(this.editingDescription) {
            this.editingDescription = false;
            return;
        }
        if(this.editingFeatures) {
            this.editingFeatures = false;
            return;
        }
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
        if(this.editingDescription) {
            this.product.description = this.tmpDescription;
            this.editingDescription = false;
            return;
        }
        if(this.editingFeatures) {
            this.product.features = this.tmpFeatures;
            this.editingFeatures = false;
            return;
        }
        this.router.backToPreviousPage();
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
            _that.items = [];
            return context.present();
        })
        .then((selection) => {
            _that.items = selection;
            selection.forEach(element => {
                _that.addImageToList(element.fileUri, element.uri);
            });
            _that._changeDetectionRef.detectChanges();
            this.garbageCollector();
            setTimeout(()=> { _that.uploadImages(); }, 100);
        }).catch(function (e) {
            console.log(e);
        });
    }

    getStretch(i: number) {
        return this.images[i].height > this.images[i].width ? 'aspectFit' : 'aspectFill';
    }

    getImageWidth() {
        return this.page.getActualSize().width / 2;
    }

    getImageHeight() {
        return this.getImageWidth() / 4 * 3;
    }

    upload(i: number) {
        let fileUri = this.images[i].fileUri;
        this.images[i].uploading = true;
        this.images[i].uploaded = false;
        this.images[i].error = false;

        this.imageService.upload(this.images[i])
        .subscribe(
            (result) => {
                console.log("Uploaded");
                console.dir(this.images[i]);
                this.logEvent(fileUri, "complete", result.secure_url);
            },
            (error) => {
                console.log("ERROR: " + JSON.stringify(error));
                this.logEvent(fileUri, "error", '');
            }
        );
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
            error: false,
            fileUrl: ''
        };
        this.images.push(obj);
    }

    getImageName(fileUri: string) {
        let name = fileUri;
        name = name.slice(name.lastIndexOf('/') + 1);
        name = name.slice(0, name.lastIndexOf('.'));
        return name;
    }

    removeImage(index: number) {
        this.images.splice(index, 1);
    }

    logEvent(fileUri, status, fileUrl) {
        let i;
        for(i = 0; i < this.images.length; i++) {
            if(fileUri === this.images[i].fileUri) {
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
    
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
