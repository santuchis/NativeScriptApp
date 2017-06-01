import application = require("application");
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

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
	@Output() navBtnTap = new EventEmitter<any>();
	@Output() buttonTap = new EventEmitter<number>();

	ios:number=2;

	isAndroid:boolean = false;

	constructor() {
		console.log("constructor called");
	 }

	ngOnInit() {
		console.dir(this.buttons);
		if(application.ios) {
			this.isAndroid = false;
		} else if (application.android) {
			this.isAndroid = true;
		}
	}

	onNavBtnTap() {
		this.navBtnTap.emit();
	}

	onButtonTap(index:number) {
		this.buttonTap.emit(index);
		this.buttons[index].icon = "res://ic_perm_identity_white";
	}
}