import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
	redirectToPage:string;
	redirectToValue:string;

	// Drawer Variables
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: RouterExtensions, private route: ActivatedRoute, private userService: UserService) {
		this.redirectToPage = this.route.snapshot.params["page"];
		this.redirectToValue = this.route.snapshot.params["value"];
	}

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
					setTimeout(() => {
						this.getUserData();
					});
				},
				(error) => {
					this.waiting = false;
					alert("Unfortunately we could not find your account.");
					console.dir(error);
				}
			);
	}

	getUserData() {
		this.userService.me().subscribe(
			() => {
				this.waiting = false;
				if(this.redirectToPage === undefined) {
					this.router.navigate(["/home"], { clearHistory: true });
				} else {
					this.router.navigate(["/" + this.redirectToPage, this.redirectToValue], { clearHistory: true });
				}
			},
			(error) => {
				this.waiting = false;
				alert("Unfortunately we could not get your user info.");
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
				(err) => {
					let message= err.status==400 ? "Email or Username already taken." : "Unfortunately we could not register your account"
					this.waiting = false;
					alert(message);
				}
			);
	}

	submit() {
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
