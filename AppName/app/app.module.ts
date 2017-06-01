import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { AppHomeComponent }         from "./pages/app-home/app-home.component";
import { LoginComponent }           from "./pages/login/login.component";
import { NavBarComponent }          from "./components/nav-bar/nav-bar.component";

import { UserService }              from "./shared/user/user.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AppHomeComponent,
        LoginComponent,
        NavBarComponent
    ],
    providers: [
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
