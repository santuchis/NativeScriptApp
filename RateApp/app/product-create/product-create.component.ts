import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";

import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";

import { Product } from "../shared/model/product";
import { ProductService } from "../shared/services/product.service";
import { Config } from "../shared/config";

import * as imagepicker from "nativescript-imagepicker";

import {session, Session, Task} from "nativescript-background-http";
import {Progress} from "ui/progress";

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
    public images = [
        
    ];
    private items = [];

    public newsession:Session;
    public task:Task;
    

    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private productService: ProductService, 
        private page: Page, private _changeDetectionRef: ChangeDetectorRef, private zone:NgZone){
            this.newsession = session("image-upload");
    };

    ngOnInit(): void {
        // Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();
		setTimeout(()=> {
            // setTimeout is a workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
			this.onDrawerRefresh();
        }, 100);
        // End Side Drawer code
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

    /**
     * workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
     */
	onDrawerRefresh(): void {
		this.drawerComponent.sideDrawer.closeDrawer();
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

    imageUpload(){
        for(let i = 0; i < this.images.length; i++) {
            if(!this.images[i].uploading && !this.images[i].uploaded) {
                var progress:Progress =<Progress> this.page.getViewById(this.images[i].fileName + "progress");
                progress.value = 0;
                let task : Task = this.newsession.uploadFile(this.images[i].fileUri, this.getRequest(this.images[i].fileName));
                this.images[i].uploading = true;
                task.on("progress", (e)=>{
                    var progress:Progress =<Progress> this.page.getViewById(this.images[i].fileName + "progress");
                    progress.value = e.currentBytes;
                    progress.maxValue = e.totalBytes;
                });
                task.on("error", (e) => { this.logEvent(e); });
                task.on("complete", (e) => { this.logEvent(e); });
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

    getRequest(fileName: string) {
        return {
            url: "http://httpbin.org/post",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": fileName
            },
            description: fileName
        };
    }

    logEvent(e) {
        let i;
        for(i = 0; i < this.images.length; i++) {
            console.log("comparing '" + e.object.description + "' with '" + this.images[i].fileName + "'");
            if(e.object.description === this.images[i].fileName) {
                console.log('if ok');
                break;
            }
        }
        console.log("index="+i);
        switch (e.eventName) {
            case "complete":
                console.log("complete: " + e.object.description);
                if(i < this.images.length) {
                    this.images[i].uploading = false;
                    this.images[i].uploaded = true;
                }
                break;
            case "error":
                console.log("error: " + e.object.description);
                console.dir(e.object);
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
