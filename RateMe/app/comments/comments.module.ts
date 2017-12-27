import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { CommentsRoutingModule } from "./comments-routing.module";
import { CommentsComponent } from "./comments.component";

@NgModule({
    imports: [
        NativeScriptModule,
        CommentsRoutingModule,
        SharedModule
    ],
    declarations: [
        CommentsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CommentsModule { }
