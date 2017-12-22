import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { SearchPageRoutingModule } from "./search-page-routing.module";
import { SearchPageComponent } from "./search-page.component";
import { ProductListComponent} from "../product-list/product-list.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchPageRoutingModule,
        SharedModule
    ],
    declarations: [
        SearchPageComponent,
        ProductListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchPageModule { }
