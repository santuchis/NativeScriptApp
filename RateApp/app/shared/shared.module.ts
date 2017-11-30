import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";

import { HttpClientModule } from '@angular/common/http';

import { MyDrawerItemComponent } from "./my-drawer-item/my-drawer-item.component";
import { MyDrawerComponent } from "./my-drawer/my-drawer.component";
import { UserService } from "../shared/services/user.service";
import { StarsComponent } from "../components/stars/stars.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        HttpClientModule
    ],
    declarations: [
        MyDrawerComponent,
        MyDrawerItemComponent,
        StarsComponent
    ],
    exports: [
        MyDrawerComponent,
        StarsComponent,
        NativeScriptUISideDrawerModule
    ],
    providers: [
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
