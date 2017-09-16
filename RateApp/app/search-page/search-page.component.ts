import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Product } from "../shared/model/product";
import { UserService } from "../shared/services/user.service";
import { ProductService } from "../shared/services/product.service";
import { SearchBar } from "ui/search-bar";
import { Device } from "../shared/device";

@Component({
    selector: 'search-page',
    moduleId: module.id,
    templateUrl: 'search-page.component.html',
    providers: [UserService, ProductService]
})
export class SearchPageComponent implements OnInit {

    private productListToChild : Product[];

    private input : string;

   
    constructor(private router: RouterExtensions,private userService: UserService, private productService: ProductService
    , private route: ActivatedRoute,private page: Page){};
     
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
        
        if(!this.userService.getUserStatus()){
           this.productListToChild = this.productService.getUserProducts();
        }
   
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

    onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        this.input = searchBar.text;
    }

    isSearching() : boolean {
        return this.input !== undefined && this.input.length > 0;
    }

    getList(): Array<Product> {
        return this.isSearching() ? this.productService.getProductsByName(this.input) : this.productListToChild;
    }

    onSubmit(args) : void {
        let searchBar = <SearchBar>args.object;
        this.router.navigate(["/result-page",searchBar.text]);

    }

    goToProduct(id) : void {
        Device.height = this.page.getMeasuredHeight();
        Device.width = this.page.getMeasuredWidth();
        Device.actualHeight = this.page.getActualSize().height;
        Device.actualWidth = this.page.getActualSize().width;
        this.router.navigate(["/product", id], {
            transition: {name: "slide"}
        });
    }
}