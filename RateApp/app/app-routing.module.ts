import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {ResultPageComponent } from "./result-page/result-page.component"

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "create", loadChildren: "./create/create.module#CreateModule" },
    { path: "favorites", loadChildren: "./favorites/favorites.module#FavoritesModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
    { path: "logout", loadChildren: "./logout/logout.module#LogoutModule" },
    { path: "search-page", loadChildren: "./search-page/search-page.module#SearchPageModule" },
    { path: "product/:id", loadChildren: "./product/product.module#ProductModule" },
    { path: "comments/:id", loadChildren: "./comments/comments.module#CommentsModule" },
    { path: "add-comment/:id", loadChildren: "./add-comment/add-comment.module#AddCommentModule" },
    { path: "result-page/:productName", loadChildren: "./result-page/result-page.module#ResultPageModule"  }

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
