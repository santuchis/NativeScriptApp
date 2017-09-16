import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Router } from "@angular/router";
import { Color } from "color";
import { View } from "ui/core/view";

import { User } from "../shared/model/user";
import { UserService } from "../shared/services/user.service";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login-common.component.css", "./login.component.css"],
    providers: [UserService],
})
export class LoginComponent implements OnInit {

	// Component Variables
    @ViewChild("container") container: ElementRef;
	@ViewChild("name") name: ElementRef;
	@ViewChild("username") username: ElementRef;
	@ViewChild("email") email: ElementRef;
	@ViewChild("password") password: ElementRef;

	private user: User = new User("", "","", "", [""]);
	isLoggingIn:boolean = true;

	// Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private userService: UserService) {}

    ngOnInit(): void {
		// Side Drawer code
        this._sideDrawerTransition = new SlideInOnTopTransition();
		setTimeout(()=> {
            // setTimeout is a workaround for issue https://github.com/NativeScript/template-drawer-navigation-ng/issues/38
			this.onDrawerRefresh();
        }, 100);
        // End Side Drawer code
	}

    toggleDisplay() {
		this.isLoggingIn = !this.isLoggingIn;
		let container = <View>this.container.nativeElement;
		container.animate({
			backgroundColor: this.isLoggingIn ? new Color("white") : new Color("white"),
			duration: 200
		});
	}

	login() {
		this.userService.login(this.user)
			.subscribe(
				() => this.router.navigate(["/home"]),
				(error) => {
					alert("Unfortunately we could not find your account.");
					console.dir(error);
				}
			);
	}
	
	signUp() {
    	this.userService.register(this.user)
			.subscribe(
				() => {
					alert("Your account was successfully created.");
					this.toggleDisplay();
				},
				() => alert("Unfortunately we were unable to create your account.")
			);
	}

	submit() {
    	if (!this.user.isValidEmail()) {
			alert("Enter a valid email address.");
			return;
		}
		if (this.isLoggingIn) {
			this.login();
		} else {
			this.signUp();
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
