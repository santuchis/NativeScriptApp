import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PlatformLocation } from '@angular/common';
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { PanGestureEventData } from "ui/gestures";
import { Page } from "ui/page";
import { confirm } from "ui/dialogs";

import { Product } from "../shared/model/product";
import { ProductService } from "../shared/services/product.service";
import { Device } from "../shared/device";
import { Config } from "../shared/config";

import animationModule = require("ui/animation");

@Component({
    selector: "Product",
    moduleId: module.id,
    styleUrls: ["./product-common.component.css", "./product.component.css"],
    templateUrl: "./product.component.html",
    providers: [ProductService]
})
export class ProductComponent implements OnInit {

    // Component Variables
    private canGoBack:boolean = false;

    @ViewChildren("dragImage") dragImages: QueryList<ElementRef>;
    private prevDeltaX: number;
    private prevDeltaY: number;
    private currentPhotoIndex: number;
    private product : Product;
    private likeStatus : number;

    private isLoading : boolean = true;
    private savingLike : boolean = false;

    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private productService: ProductService, 
        private page: Page, private location : PlatformLocation){};

    ngOnInit(): void {
        // Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();
		setTimeout(()=> {
            // setTimeout is a workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
			this.onDrawerRefresh();
        }, 100);
        // End Side Drawer code
        
        this.currentPhotoIndex = 0;
        const id = this.route.snapshot.params["id"];
        this.isLoading = true;
        this.productService.getProductById(id).subscribe(result => {
            this.product = result["product"];
            this.likeStatus = result["likes"];
            this.isLoading = false;
            setTimeout(()=>{
                this.initImagesPositions();
            }, 0);
        });

        this.canGoBack = this.router.locationStrategy.canGoBack();

        this.location.onPopState(() => {
            this.productService.getProductById(id).subscribe(result => {
                let p  = result["product"];
                this.product.rate = p.rate;
                this.product.commentsCount = p.commentsCount;
            });
        });
    }

    initImagesPositions(): void {
        console.log('isloading='+this.isLoading);
        let i = 0;
        this.dragImages.forEach(el => el.nativeElement.translateX = Device.actualWidth * (i++))
        console.log('isloading='+this.isLoading);
    }

    getShortDescription() : string {
        return this.product.description.length > 400 ? this.product.description.slice(0, 400) + "..." : this.product.description;
    }

    move(index: number, milliseconds: number) {
        let definitions = new Array<animationModule.AnimationDefinition>();
        let i = 0;
        this.dragImages.forEach(item => {
            definitions.push({
                target: item.nativeElement,
                translate: {x: (i - index) * Device.actualWidth, y: 0},
                duration: milliseconds
            });
            i++;
        });
        var animationSet = new animationModule.Animation(definitions);

        animationSet.play().then(() => {
            // Animation finished
        })
        .catch((e) => {
            console.log(e.message);
        });
    }

    onPan(args: PanGestureEventData) {
        if (args.state === 1) {
            this.prevDeltaX = 0;
            this.prevDeltaY = 0;
        } else if (args.state === 2) {
            this.dragImages.forEach(el => el.nativeElement.translateX += args.deltaX - this.prevDeltaX);
            this.prevDeltaX = args.deltaX;
        } else if (args.state === 3) {
            if(args.deltaX < 0 && args.deltaX < Device.actualWidth / -3) {
                // go right
                if(this.currentPhotoIndex < (this.product.images.length-1)) {
                    this.currentPhotoIndex++;
                }
            } else if(args.deltaX > 0 && args.deltaX > (Device.actualWidth / 3)) {
                // go left
                if(this.currentPhotoIndex > 0) {
                    this.currentPhotoIndex--;
                }
            }
            this.move(this.currentPhotoIndex, 500);
        }
    }

    showLoginDialog(): void {
        let options = {
            title: "Inicia sesión.",
            message: "Quieres ir al formulario de inicio de sesión?",
            okButtonText: "Si",
            cancelButtonText: "No"
        }
        confirm(options).then((result: boolean) => {
            if(result) {
                this.router.navigate(["/login", "product", this.product.id], {
                    transition: {name: "fade"}
                });
            }
        });
    }

    goToAddComment() : void {
        if(Config.token === undefined) {
            this.showLoginDialog();
        } else {
            this.router.navigate(["/add-comment", this.product.id], {
                transition: {name: "slide"}
            });
        }
    }

    like(): void {
        if(this.savingLike) { return; }
        if(Config.token === undefined) {
            this.showLoginDialog();
        } else {
            this.savingLike = true;
            if(this.likeStatus == 1) {
                this.productService.unlikeProduct(this.product.id).subscribe(result => {
                    if(result.success) {
                        this.product.likesCount--;
                        this.likeStatus = 0;
                        this.savingLike = false;
                    } else {
                        alert("Unlike was not saved, try again.");
                    }
                });
            } else {
                this.productService.likeProduct(this.product.id).subscribe(result => {
                    if(result.success) {
                        this.product.likesCount++;
                        if(this.likeStatus < 0) { this.product.dislikesCount--; }
                        this.likeStatus = 1;
                        this.savingLike = false;
                    } else {
                        alert("Like was not saved, try again.");
                    }
                });
            }
        }
    }

    dislike(): void {
        if(this.savingLike) { return; }
        if(Config.token === undefined) {
            this.showLoginDialog();
        } else {
            this.savingLike = true;
            if(this.likeStatus == -1) {
                this.productService.unlikeProduct(this.product.id).subscribe(result => {
                    if(result.success) {
                        this.product.dislikesCount--;
                        this.likeStatus = 0;
                        this.savingLike = false;
                    } else {
                        alert("Unlike was not saved, try again.");
                    }
                });
            } else {
                this.productService.dislikeProduct(this.product.id).subscribe(result => {
                    if(result.success) {
                        this.product.dislikesCount++;
                        if(this.likeStatus > 0) { this.product.likesCount-- ;}
                        this.likeStatus = -1;
                        this.savingLike = false;
                    } else {
                        alert("Dislike was not saved, try again.");
                    }
                });
            }
        }
    }

    goToComments() : void {
        this.router.navigate(["/comments", this.product.id], {
            transition: {name: "slide"}
        });
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

}
