import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "create", loadChildren: "./create/create.module#CreateModule" },
    { path: "favorites", loadChildren: "./favorites/favorites.module#FavoritesModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
    { path: "logout", loadChildren: "./logout/logout.module#LogoutModule" },
    { path: "search-page", loadChildren: "./search-page/search-page.module#SearchPageModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
