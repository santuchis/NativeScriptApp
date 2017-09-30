import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { Color } from "color";
import { View } from "ui/core/view";

import { User } from "../shared/model/user";
import { UserService } from "../shared/services/user.service";

import { Config } from "../shared/config";

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
	waiting:boolean = false;

	// Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private userService: UserService) {}

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
				() => {
					this.waiting = false;
					this.router.navigate(["/home"], { clearHistory: true });
				},
				(error) => {
					this.waiting = false;
					alert("Unfortunately we could not find your account.");
					console.dir(error);
				}
			);
	}
	
	signUp() {
    	this.userService.register(this.user)
			.subscribe(
				() => {
					this.waiting = false;
					alert("Your account was successfully created.");
					this.toggleDisplay();
				},
				() => {
					this.waiting = false;
					alert("Unfortunately we were unable to create your account.");
				}
			);
	}

	submit() {
    	if (!this.user.isValidEmail()) {
			alert("Enter a valid email address.");
			return;
		}
		this.waiting = true;
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
