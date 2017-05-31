import application = require("application");
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TnsSideDrawer } from 'nativescript-sidedrawer'
import { Color } from "color";
import { SearchBar } from "ui/search-bar";

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
	@ViewChild("searchBar") searchBar: ElementRef;

	constructor() {
	}

	ngOnInit() {
		if(application.ios) {
			this.isAndroid = false;
			this.searchColor = '#f4f4f4';
			let searchInput = <SearchBar> this.searchBar.nativeElement;
			console.log("---");
			console.log(searchInput.ios);
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