import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProductRoutingModule,
        SharedModule
    ],
    declarations: [
        ProductComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProductModule { }
