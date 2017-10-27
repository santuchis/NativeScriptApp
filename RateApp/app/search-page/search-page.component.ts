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
import { Config } from "../shared/config";

@Component({
    selector: 'search-page',
    moduleId: module.id,
    templateUrl: 'search-page.component.html',
    providers: [UserService, ProductService]
})
export class SearchPageComponent implements OnInit {

    private productListToChild : Product[] = [];
    private suggestedproducts : Array<Product> = [];

    private input : string;
    private lastSearched : string = "";

    private isLoading : boolean = false;
    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

   
    constructor(private router: RouterExtensions,private userService: UserService, private productService: ProductService
    , private route: ActivatedRoute,private page: Page){};

    ngOnInit(): void {
        // Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();
		setTimeout(()=> {
            // setTimeout is a workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
			this.onDrawerRefresh();
        }, 100);
        // End Side Drawer code

        if(Config.token !== undefined){
            console.log("START getUserStatus");
            this.productService.getSearchedProducts()
                .subscribe(result => {
                    result["products"].forEach((p) => {
                        this.productListToChild.push(p);
                    });
                    this.isLoading = false;
                });
            }
    }

    onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        this.input = searchBar.text;
        if(this.input !== undefined && this.input.length > 0 && this.input.trim() !== this.lastSearched.trim()) {
            this.lastSearched = this.input;
            this.isLoading = true;
            this.productService.getProductsByName(this.input)
                .subscribe(result => {
                    this.suggestedproducts = [];
                    result["products"].forEach((p) => {
                        this.suggestedproducts.push(p);
                    });
                    console.log("COUNT FROM RESPONSE="+result["count"]);
                    this.isLoading = false;
                });
        }
    }

    isSearching() : boolean {
        return this.input !== undefined && this.input.length > 0;
    }

    getList() {
        if(this.isSearching()) {
            return this.suggestedproducts;
        } else {
            //TODO no tiene el nuevo valor guardado, al momento de terminar la busqueda
            this.suggestedproducts = [];
            return this.productListToChild;
        }
    }

    onSubmit(args) : void {
        let searchBar = <SearchBar>args.object;
        this.router.navigate(["/result-page",searchBar.text]);
    }

    goToProduct(product : Product) : void {
        Device.height = this.page.getMeasuredHeight();
        Device.width = this.page.getMeasuredWidth();
        Device.actualHeight = this.page.getActualSize().height;
        Device.actualWidth = this.page.getActualSize().width;
        this.router.navigate(["/product", product.id], {
            transition: {name: "slide"}
        });
        console.log("Por llamar");
        if(Config.token !== null) {
            this.productService.saveSearchedProduct(product.id,product.name)
                .subscribe(
                    () => {
                       this.productListToChild.unshift(product);
                    },
                    () => {
                        console.log("Error en salvar producto");
                    }
                );
        }
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