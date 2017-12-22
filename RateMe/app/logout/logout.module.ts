import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { LogoutRoutingModule } from "./logout-routing.module";
import { LogoutComponent } from "./logout.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        LogoutRoutingModule,
        SharedModule
    ],
    declarations: [
        LogoutComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LogoutModule { }
