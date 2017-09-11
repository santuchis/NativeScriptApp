import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { PanGestureEventData } from "ui/gestures";
import { Page } from "ui/page";

import { Product } from "../shared/model/product";
import { ProductService } from "../shared/services/product.service";
import { Device } from "../shared/device";

import animationModule = require("ui/animation");

@Component({
    selector: "Product",
    moduleId: module.id,
    styleUrls: ["./product.component.scss"],    
    templateUrl: "./product.component.html",
    providers: [ProductService]
})
export class ProductComponent implements OnInit {

    @ViewChildren("dragImage") dragImages: QueryList<ElementRef>;

    private product : Product;
    
    private prevDeltaX: number;
    private prevDeltaY: number;
    private currentPhotoIndex: number;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private productService: ProductService, private page: Page){};

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
        this.currentPhotoIndex = 0;
        const id = this.route.snapshot.params["id"];
        this.product = this.productService.getProductById(id);

        this._sideDrawerTransition = new SlideInOnTopTransition();

        // workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
		setTimeout(()=> {
			this.onDrawerRefresh();
        }, 100);
    }

    ngAfterViewInit(): void {
        let i = 0;
        this.dragImages.forEach(el => el.nativeElement.translateX = Device.actualWidth * (i++))
    }

    onDrawerRefresh(): void {
		// workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
		this.drawerComponent.sideDrawer.closeDrawer();
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

    onTap() : void{
        this.router.navigate(["/search-page"], {
            transition: {name: "fade"}
        });
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

}
