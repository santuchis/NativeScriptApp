import application = require("application");
import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
	selector: 'app-home',
	moduleId: module.id,
	templateUrl: 'app-home.component.html',
	styleUrls: ['app-home-common.css', 'app-home.css']
})

export class AppHomeComponent implements OnInit {

	searchColor: string;
	searchValue: string;

	navBarButton = { icon: "res://ic_menu_white", text: "" };
	buttons = [ 
		{icon: "res://ic_perm_identity_white", iosIcon: "", androidIcon: "", text: ""},
		{icon: "res://ic_home_white", iosIcon: "", androidIcon: "", text: ""},	
	];

	constructor() {
	}

	ngOnInit() {
		if(application.ios) {
			this.searchColor = '#f4f4f4';
		} else if (application.android) {
			this.searchColor = 'white';
		}
	}
}