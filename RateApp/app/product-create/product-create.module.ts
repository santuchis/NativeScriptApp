import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { ProductCreateRoutingModule } from "./product-create-routing.module";
import { ProductCreateComponent } from "./product-create.component";

@NgModule({
    imports: [
        NativeScriptFormsModule,
        NativeScriptModule,
        ProductCreateRoutingModule,
        SharedModule
    ],
    declarations: [
        ProductCreateComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProductCreateModule { }