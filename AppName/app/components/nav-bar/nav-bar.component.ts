import application = require("application");
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TnsSideDrawer, TnsSideDrawerItem } from 'nativescript-sidedrawer'
import { Color } from "color";
import { Router } from "@angular/router";
import { Config } from "../../shared/config";

@Component({
	selector: 'nav-bar',
	moduleId: module.id,
	templateUrl: 'nav-bar.component.html',
	styleUrls: ['nav-bar.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavBarComponent implements OnInit {

	@Input() navBtn: { icon: string, text: string };
	@Input() buttons: [{ icon: string, iosIcon:string, androidIcon:string, text: string }];
	@Input() barTitle: string = "";
	@Output() navBtnTap = new EventEmitter<any>();
	@Output() buttonTap = new EventEmitter<number>();

	sideItems: Array<TnsSideDrawerItem> = [];

	isAndroid:boolean = false;

	constructor(private router: Router) {}

	ngOnInit() {
		if(application.ios) {
			this.isAndroid = false;
		} else if (application.android) {
			this.isAndroid = true;
		}
		this.setDrawerItems();
		this.buildDrawer();
	}

	setDrawerItems() {
		if(Config.token === '') {
			this.sideItems = [{
				title: 'Inicio',
				androidIcon: 'ic_home_white_24dp',
				iosIcon: 'ic_home_white_24dp',
			}, {
				title: 'Ingresar',
				androidIcon: 'ic_perm_identity_white_24dp',
				iosIcon: 'ic_perm_identity_white_24dp',
			}];
		} else {
			this.sideItems = [{
				title: 'Inicio',
				androidIcon: 'ic_home_white_24dp',
				iosIcon: 'ic_home_white_24dp',
			}, {
				title: 'Crear',
				androidIcon: 'ic_add_white_24dp',
				iosIcon: 'ic_add_white_24dp',
			}, {
				title: 'Favoritos',
				androidIcon: 'ic_favorite_border_white_24dp',
				iosIcon: 'ic_favorite_border_white_24dp',
			}, {
				title: 'Cuenta',
				androidIcon: 'ic_perm_identity_white_24dp',
				iosIcon: 'ic_perm_identity_white_24dp',
			}];
		}
	}

	buildDrawer() {
		TnsSideDrawer.build({
			templates: this.sideItems,
			textColor: new Color("white"),
			headerBackgroundColor: new Color("gray"),
			backgroundColor: new Color("blue"),
			title: 'RateMe',
			subtitle: 'What people think about products!',
			listener: (index) => {
				this.navigateTo(index);
			},
			context: this,
		});
	}

	/**
	 * Method called when Nav Button is clicked (the one on left position)
	 */
	onNavBtnTap() {
		this.toggleDrawer();
		this.navBtnTap.emit();
	}

	/**
	 * Method called when secondary buttons are clicked (the one on right position)
	 */
	onButtonTap(index:number) {
		this.buttonTap.emit(index);
		console.log("button tapped #" + index);
	}

	navigateTo(index:number) {
		if(Config.token === '') {
			switch(index) {
				case 0:
					console.log("go to home");
					this.router.navigate(["/home"]);
					break;
				case 1:
					console.log("go to sign in");
					this.router.navigate(["/login"]);
					break;
			}
		} else {
			switch(index) {
				case 0:
					console.log("go to home");
					this.router.navigate(["/home"]);
					break;
				case 1:
					console.log("go to create");
					break;
				case 2:
					console.log("go to favs");
					break;
				case 3:
					console.log("go to account");
					break;
			}
		}
	}
	
	toggleDrawer() {
    	console.log("Show SideDrawer tapped.");
		this.setDrawerItems();
		this.buildDrawer();
		TnsSideDrawer.toggle(true, 1);
	}
}