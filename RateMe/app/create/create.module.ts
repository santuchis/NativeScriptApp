import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { CreateRoutingModule } from "./create-routing.module";
import { CreateComponent } from "./create.component";

@NgModule({
    imports: [
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        CreateRoutingModule,
        SharedModule
    ],
    declarations: [
        CreateComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CreateModule { }
