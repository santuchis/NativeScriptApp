import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";

import { action } from "ui/dialogs";

@Component({
    selector: "Comments",
    moduleId: module.id,
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent implements OnInit {

    private comments : string[] = ["", "", ""];
    private stars : string[] = ["Todas", "1 Estrella", "2 Estrellas", "3 Estrellas", "4 Estrellas", "5 Estrellas"];
    public picked: string = "Todas";

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

    goToAddComment(): void {

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
}
