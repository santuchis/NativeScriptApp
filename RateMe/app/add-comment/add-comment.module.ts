import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { AddCommentRoutingModule } from "./add-comment-routing.module";
import { AddCommentComponent } from "./add-comment.component";

@NgModule({
    imports: [
        NativeScriptFormsModule,
        NativeScriptModule,
        AddCommentRoutingModule,
        SharedModule
    ],
    declarations: [
        AddCommentComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddCommentModule { }
