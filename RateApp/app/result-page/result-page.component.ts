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

		this.productList = this.productService.getUserProducts();

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