import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";

@NgModule({
    imports: [
        NativeScriptModule,
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
