import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Router } from "@angular/router";
import { Product } from "../shared/model/product";
import { UserService } from "../shared/services/user.service";
import { ProductService } from "../shared/services/product.service";
import { SearchBar } from "ui/search-bar";


@Component({
	selector: 'search-page',
    moduleId: module.id,
    templateUrl: 'search-page.component.html',
    providers: [UserService, ProductService]
})
export class SearchPageComponent implements OnInit {

    public productListToChild : Product[] = [new Product("aaaa")];

    input : string;

	constructor(private router: Router,private userService: UserService, private productService: ProductService){};
     
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
        if(this.isSearching()) {
            return this.productService.getProductsByName(this.input);
        } else {
            return this.productListToChild;
        }
    }
}