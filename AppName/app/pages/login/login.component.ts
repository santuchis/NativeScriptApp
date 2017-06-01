import { Router } from "@angular/router";
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Color } from "color";
import { View } from "ui/core/view";

import { User } from "../../shared/user/user";

@Component({
	selector: 'login',
	moduleId: module.id,
	templateUrl: 'login.component.html',
	styleUrls: ['login-common.css', 'login.css']
})

export class LoginComponent implements OnInit {

	user: User;
	isLoggingIn = true;
	@ViewChild("container") container: ElementRef;
	@ViewChild("email") email: ElementRef;
	@ViewChild("password") password: ElementRef;
	
	constructor(private router: Router) {
		this.user = new User();
		this.user.email = "gui@lle.com";
		this.user.password = "guille";
	}

	ngOnInit() {}

	toggleDisplay() {
		this.isLoggingIn = !this.isLoggingIn;
		let container = <View>this.container.nativeElement;
		container.animate({
			backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
			duration: 200
		});
	}

	login() {
		/*
		this.userService.login(this.user)
			.subscribe(
				() => this.router.navigate(["/list"]),
				(error) => alert("Unfortunately we could not find your account.")
			);
		*/
	}
	
	signUp() {
		/*
    	this.userService.register(this.user)
			.subscribe(
				() => {
					alert("Your account was successfully created.");
					this.toggleDisplay();
				},
				() => alert("Unfortunately we were unable to create your account.")
			);
		*/
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