import application = require("application");
import { Component, OnInit, AfterViewInit } from '@angular/core';
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

	searchColor: string = '';
	i:number = 0;
	navBarButton = { icon: "res://ic_menu_white", text: "" };
	buttons = [ 
		{icon: "res://ic_perm_identity_white", iosIcon: "3", androidIcon: "ic_menu_save", text: ""},
		{icon: undefined, iosIcon: "2", androidIcon: "ic_menu_edit", text: ""},
		
	];
	//{icon: "res://ic_home_white", iosIcon: "2", androidIcon: "ic_menu_edit", text: ""},
	//{icon: "res://ic_perm_identity_white", iosIcon: "3", androidIcon: "ic_menu_save", text: ""}
	/* IOS Icons
	0	Done			12	Search
	1	Cancel			13	Refresh
	2	Edit			14	Stop
	3	Save			15	Camera
	4	Add				16	Trash
	5	FlexibleSpace	17	Play
	6	FixedSpace		18	Pause
	7	Compose			19	Rewind
	8	Reply			20	FastForward
	9	Action			21	Undo
	10	Organize		22	Redo
	11	Bookmarks		23	PageCurl
	*/

	constructor(private router: Router) {
	}

	ngOnInit() {
		if(application.ios) {
			this.searchColor = '#f4f4f4';
		} else if (application.android) {
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

	navButtonTap(index) {
		console.log("tapped on indexx=" + index);
		this.buttons.push({icon: "res://ic_perm_identity_white", iosIcon: "3", androidIcon: "ic_menu_save", text: ""});
	}
}