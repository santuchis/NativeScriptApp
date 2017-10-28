import { Component, OnInit,Input, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "../shared/services/user.service";
import { ProductService } from "../shared/services/product.service";
import { Product } from "../shared/model/product";
import { Observable } from "rxjs/Rx";
import { Device } from "../shared/device";
import { Page } from "ui/page";
import { SearchBar } from "ui/search-bar";

@Component({
	selector: 'result-page',
	moduleId: module.id,
	templateUrl: './result-page.component.html',
	styleUrls: ['./result-page.component.css'],
    providers: [UserService, ProductService]
})
export class ResultPageComponent implements OnInit {

	// Component Variables
	private input : string;
	@Input() productList : Product[] = [];

	// Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    private isLoading : boolean = true;
    private currentPage : number = 0;
    private hasNext : boolean = false;

    constructor(private router: RouterExtensions,private userService: UserService, private productService: ProductService
		, private route: ActivatedRoute,private page: Page){};

	ngOnInit() {
		// Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();
		setTimeout(()=> {
            // setTimeout is a workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
			this.onDrawerRefresh();
        }, 100);
        // End Side Drawer code

		this.route.params.subscribe(
			(params : Params) => {
				this.input = params['productName'];
			}
        );
        
        this.productService.getProductsByTags(this.input,this.currentPage).subscribe(
            (result) => {
                if(result.success) {
                    this.productList = [];
                    result["products"].forEach((p) => {
                        this.productList.push(p);
                    });
                    this.hasNext = !result.isLast;
                }
                this.isLoading = false;
            },
            (error) => {
                console.log(error);
                this.isLoading = false;
            }
        );
	 }
	
	goToProduct(product : Product) : void {
        Device.height = this.page.getMeasuredHeight();
        Device.width = this.page.getMeasuredWidth();
        Device.actualHeight = this.page.getActualSize().height;
        Device.actualWidth = this.page.getActualSize().width;
        this.router.navigate(["/product", product.id], {
            transition: {name: "slide"}
        });
        this.productService.saveSearchedProduct(product.id,product.name)
        .subscribe(
            () => {
               console.log("Exito en salvar producto");
            },
            () => {
                console.log("Error en salvar producto");
            }
        );
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
    
    onSubmit(args) : void {
        this.isLoading = true;
        this.currentPage = 0;
        let searchBar = <SearchBar>args.object;
        this.input = searchBar.text;
        this.productList = [];
        this.productService.getProductsByTags(this.input, this.currentPage).subscribe(
            (result) => {
                result["products"].forEach((p) => {
                    this.productList.push(p);
                });
                this.hasNext = !result.isLast;
                this.isLoading = false;
            },
            (error) => {
                this.isLoading = false;
                this.hasNext = false;
                console.log(error);
            }
        );
    }

    loadNextProductPage(): void {
        this.isLoading = true;
        this.currentPage++;
        this.productService.getProductsByTags(this.input,this.currentPage).subscribe(
            (result) => {
                if(result.success) {
                    result["products"].forEach((p) => {
                        this.productList.push(p);
                    });
                    this.hasNext = !result.isLast;
                }
                this.isLoading = false;
            },
            (error) => {
                this.isLoading = false;
                console.log(error);
            }
        );
    }
}