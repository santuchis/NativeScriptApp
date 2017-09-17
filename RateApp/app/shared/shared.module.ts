import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-telerik-ui/sidedrawer/angular";

import { MyDrawerComponent } from "./my-drawer/my-drawer.component";
import { UserService } from "../shared/services/user.service";
import { StarsComponent } from "../components/stars/stars.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        MyDrawerComponent,
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
