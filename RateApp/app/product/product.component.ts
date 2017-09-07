import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";

import { Product } from "../shared/model/product";
import { ProductService } from "../shared/services/product.service";

@Component({
    selector: "Product",
    moduleId: module.id,
    styleUrls: ["./product.component.css"],    
    templateUrl: "./product.component.html",
    providers: [ProductService]
})
export class ProductComponent implements OnInit {

    private product : Product;
    private expandDescription : boolean = true;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private productService: ProductService){};

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
        const id = this.route.snapshot.params["id"];
        this.product = this.productService.getProductById(id);

        this._sideDrawerTransition = new SlideInOnTopTransition();

        // workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
		setTimeout(()=> {
			this.onDrawerRefresh();
		}, 100);
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

    toggleDescription() {
        this.expandDescription = !this.expandDescription;
    }
    
    getDescription() : string {
        return this.expandDescription ? this.product.description : this.product.description.slice(0, 400) + "...";
    }

}
