import application = require("application");
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TnsSideDrawer } from 'nativescript-sidedrawer'
import { Color } from "color";

@Component({
	selector: 'app-home',
	moduleId: module.id,
	templateUrl: 'app-home.component.html',
	styleUrls: ['app-home-common.css', 'app-home.css']
})

export class AppHomeComponent implements OnInit {

	isAndroid:boolean = false;
	searchColor: string = '';
	i:number = 0;

	constructor(private router: Router) {
	}

	ngOnInit() {
		if(application.ios) {
			this.isAndroid = false;
			this.searchColor = '#f4f4f4';
		} else if (application.android) {
			this.isAndroid = true;
			this.searchColor = 'white';
		}

		TnsSideDrawer.build({
			templates: [{
				title: 'Inicio',
				androidIcon: 'ic_home_white',
				iosIcon: 'ic_home_white',
			}, {
				title: 'Ingresar',
				androidIcon: 'ic_perm_identity_white',
				iosIcon: 'ic_perm_identity_white',
			}, {
				title: 'Registrarse',
				androidIcon: 'ic_perm_identity_white',
				iosIcon: 'ic_perm_identity_white',
			}],
			textColor: new Color("white"),
			headerBackgroundColor: new Color("red"),
			backgroundColor: new Color("blue"),
			title: 'RateMe',
			subtitle: 'What people think about products!',
			listener: (index) => {
				this.i = index;
				this.navigateTo(index);
			},
			context: this,
		});
	}

	navigateTo(index:number) {
		console.log("navTo v1: " + index);
		switch(index) {
			case 0:
				console.log("go to home");
				this.router.navigate(["/home"])
				break;
			case 1:
				console.log("go to sign in");
				this.router.navigate(["/login"])
				break;
			case 2:
				console.log("go to sign up");
				this.router.navigate(["/login"])
				break;
		}
	}

	toggleDrawer() {
    	console.log("Show SideDrawer tapped.");
		TnsSideDrawer.toggle();
	}
}