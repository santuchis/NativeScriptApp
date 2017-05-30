import application = require("application");
import { Component, OnInit } from '@angular/core';
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
	i:number = 0;

	constructor() {
	}

	ngOnInit() {
		if(application.ios) {
			this.isAndroid = false;
		} else if (application.android) {
			this.isAndroid = true;
		}

		TnsSideDrawer.build({
			templates: [{
				title: 'Home',
				androidIcon: 'ic_menu_white',
				iosIcon: 'ic_menu_white',
			}, {
				title: 'Judgment Day',
				androidIcon: 'ic_menu_white',
				iosIcon: 'ic_menu_white',
			}, {
				title: 'Bank Roll',
				androidIcon: 'ic_menu_white',
				iosIcon: 'ic_menu_white',
			}, {
				title: 'Fix Stuff',
				androidIcon: 'ic_menu_white',
				iosIcon: 'ic_menu_white',
			}, {
				title: 'This Is Me',
				androidIcon: 'ic_menu_white',
				iosIcon: 'ic_menu_white',
			}],
			textColor: new Color("white"),
			headerBackgroundColor: new Color("red"),
			backgroundColor: new Color("blue"),
			title: 'This App Name',
			subtitle: 'is just as awesome as this subtitle!',
			listener: (index) => {
				this.i = index
			},
			context: this,
		});
	}

	toggleDrawer() {
    	console.log("Show SideDrawer tapped.");
		TnsSideDrawer.toggle();
	}
}