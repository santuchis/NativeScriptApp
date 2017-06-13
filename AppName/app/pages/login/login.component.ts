import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Color } from "color";
import { View } from "ui/core/view";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
	selector: 'login',
	providers: [UserService],
	moduleId: module.id,
	templateUrl: 'login.component.html',
	styleUrls: ['login-common.css', 'login.css']
})

export class LoginComponent implements OnInit {

	user: User;
	isLoggingIn:boolean = true;

	@ViewChild("container") container: ElementRef;
	@ViewChild("email") email: ElementRef;
	@ViewChild("password") password: ElementRef;

	navBarButton = { icon: "res://ic_menu_white", text: "" };
	buttons = [ 
		{icon: "res://ic_perm_identity_white", iosIcon: "", androidIcon: "", text: ""},
		{icon: "res://ic_home_white", iosIcon: "", androidIcon: "", text: ""},	
	];
	
	constructor(private router: Router, private userService: UserService) {
		this.user = new User("guille@ns.com", "qwerty");
	}

	ngOnInit() {
	}

	toggleDisplay() {
		this.isLoggingIn = !this.isLoggingIn;
		let container = <View>this.container.nativeElement;
		container.animate({
			backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
			duration: 200
		});
		console.dir(this.user);
	}

	login() {
		this.userService.login(this.user)
			.subscribe(
				() => this.router.navigate(["/home"]),
				(error) => {alert("Unfortunately we could not find your account."); console.dir(error);}
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