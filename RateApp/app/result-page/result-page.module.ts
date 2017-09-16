import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { ResultPageRoutingModule } from "./result-page-routing.module";
import { ResultPageComponent } from "./result-page.component";

@NgModule({
    imports: [
        NativeScriptModule,
        SharedModule,
        ResultPageRoutingModule
    ],
    declarations: [
        ResultPageComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ResultPageModule { }
