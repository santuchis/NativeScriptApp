import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Router } from "@angular/router";
import { Color } from "color";
import { View } from "ui/core/view";

import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login-common.component.css", "./login.component.css"],
    providers: [UserService],
})
export class LoginComponent implements OnInit {

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild("container") container: ElementRef;
	@ViewChild("name") name: ElementRef;
	@ViewChild("username") username: ElementRef;
	@ViewChild("email") email: ElementRef;
	@ViewChild("password") password: ElementRef;

    private _sideDrawerTransition: DrawerTransitionBase;
    private user: User;
	private isLoggingIn:boolean = true;

    constructor(private router: Router, private userService: UserService) {
		this.user = new User("Gui Test", "guitest","guille@ns.com", "qwerty", ["ROLE_CLIENT"]);
    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
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
}
