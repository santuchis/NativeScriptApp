import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { AppHomeComponent } from "./pages/app-home/app-home.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full"},
    { path: "home", component: AppHomeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }