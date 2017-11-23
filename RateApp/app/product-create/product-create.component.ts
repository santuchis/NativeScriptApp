import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";

import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";

import { Product } from "../shared/model/product";
import { ProductService } from "../shared/services/product.service";
import { Config } from "../shared/config";

import * as imagepicker from "nativescript-imagepicker";


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
    private items = [];
    

    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private productService: ProductService, 
        private page: Page, private _changeDetectionRef: ChangeDetectorRef){};

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
            _that.items = [];
            return context.present();
        })
        .then((selection) => {
            console.log("Selection done:");
            selection.forEach(function (selected) {
                console.log("----------------");
                console.log("uri: " + selected.uri);
                console.log("fileUri: " + selected.fileUri);
            });
            _that.items = selection;
            _that._changeDetectionRef.detectChanges();
        }).catch(function (e) {
            console.log(e);
        });
    }

}
