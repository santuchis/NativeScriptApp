import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { FavoritesRoutingModule } from "./favorites-routing.module";
import { FavoritesComponent } from "./favorites.component";

@NgModule({
    imports: [
        NativeScriptModule,
        FavoritesRoutingModule,
        SharedModule
    ],
    declarations: [
        FavoritesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FavoritesModule { }
