import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { ResultPageRoutingModule } from "./result-page-routing.module";
import { ResultPageComponent } from "./result-page.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
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
