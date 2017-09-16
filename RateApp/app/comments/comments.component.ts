import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";

import { action } from "ui/dialogs";

@Component({
    selector: "Comments",
    moduleId: module.id,
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.css"],
})
export class CommentsComponent implements OnInit {

    // Component Variables
    private comments : string[] = ["", "", ""];
    private stars : string[] = ["Todas", "1 Estrella", "2 Estrellas", "3 Estrellas", "4 Estrellas", "5 Estrellas"];
    private picked: string = "Todas";
    private productId : string;

    // Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute) {}

    ngOnInit(): void {
        // Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();
		setTimeout(()=> {
            // setTimeout is a workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
			this.onDrawerRefresh();
        }, 100);
        // End Side Drawer code

        this.productId = this.route.snapshot.params["id"];
        console.log("Comments Page - ID: " + this.productId);
    }

    goToAddComment(): void {
        this.router.navigate(["/add-comment", this.productId], {
            transition: {name: "slide"}
        });
    }

    showStarsOptions() : void {
        let options = {
            title: "Filtro por estrellas",
            message: "Selecciona una option",
            cancelButtonText: "Cancelar",
            actions: this.stars
        };
        
        action(options).then((result) => {
            if(result !== options.cancelButtonText && this.picked !== result) {
                this.picked = result;
                console.log(result);
            }
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
