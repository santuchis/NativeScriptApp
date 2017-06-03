import { AppHomeComponent } from "./pages/app-home/app-home.component";
import { LoginComponent } from "./pages/login/login.component";

export const routes = [
    { path: "", redirectTo: "/home", pathMatch: "full"},
    { path: "home", component: AppHomeComponent },
    { path: "login", component: LoginComponent }
];

export const navigatableComponents = [
  AppHomeComponent,
  LoginComponent
];