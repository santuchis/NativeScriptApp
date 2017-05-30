import application = require("application");
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	moduleId: module.id,
	templateUrl: 'app-home.component.html',
	styleUrls: ['app-home-common.css', 'app-home.css']
})

export class AppHomeComponent implements OnInit {

	isAndroid:boolean = false;

	constructor() { }

	ngOnInit() {
		if(application.ios) {
			this.isAndroid = false;
		} else if (application.android) {
			this.isAndroid = true;
		}
	}

	showSideDrawer() {
    	console.log("Show SideDrawer tapped.");
	}
}