import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
    styleUrls: ["./product.component.css"],    
    templateUrl: "./product.component.html",
    providers: [ProductService]
})
export class ProductComponent implements OnInit {

    // Component Variables
    @ViewChildren("dragImage") dragImages: QueryList<ElementRef>;
    private product : Product;
    private prevDeltaX: number;
    private prevDeltaY: number;
    private currentPhotoIndex: number;

    private rateValue :number = 2.5;

    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private productService: ProductService, private page: Page){};

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
        this.product = this.productService.getProductById(id);
    }

    ngAfterViewInit(): void {
        let i = 0;
        this.dragImages.forEach(el => el.nativeElement.translateX = Device.actualWidth * (i++))
    }

    getShortDescription() : string {
        return this.product.description.slice(0, 400) + "...";
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
                this.router.navigate(["/login"], {
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
        if(Config.token === undefined) {
            this.showLoginDialog();
        } else {
            // TODO save like
        }
    }

    dislike(): void {
        if(Config.token === undefined) {
            this.showLoginDialog();
        } else {
            // TODO save dislike
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
