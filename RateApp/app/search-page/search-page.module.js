"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var shared_module_1 = require("../shared/shared.module");
var search_page_routing_module_1 = require("./search-page-routing.module");
var search_page_component_1 = require("./search-page.component");
var product_list_component_1 = require("../product-list/product-list.component");
var SearchPageModule = (function () {
    function SearchPageModule() {
    }
    return SearchPageModule;
}());
SearchPageModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            search_page_routing_module_1.SearchPageRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            search_page_component_1.SearchPageComponent,
            product_list_component_1.ProductListComponent
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], SearchPageModule);
exports.SearchPageModule = SearchPageModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXBhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLXBhZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELGdGQUE4RTtBQUU5RSx5REFBdUQ7QUFDdkQsMkVBQXVFO0FBQ3ZFLGlFQUE4RDtBQUM5RCxpRkFBNEU7QUFnQjVFLElBQWEsZ0JBQWdCO0lBQTdCO0lBQWdDLENBQUM7SUFBRCx1QkFBQztBQUFELENBQUMsQUFBakMsSUFBaUM7QUFBcEIsZ0JBQWdCO0lBZDVCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQixvREFBdUI7WUFDdkIsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLDJDQUFtQjtZQUNuQiw2Q0FBb0I7U0FDdkI7UUFDRCxPQUFPLEVBQUU7WUFDTCx1QkFBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csZ0JBQWdCLENBQUk7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcblxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XG5pbXBvcnQgeyBTZWFyY2hQYWdlUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL3NlYXJjaC1wYWdlLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBTZWFyY2hQYWdlQ29tcG9uZW50IH0gZnJvbSBcIi4vc2VhcmNoLXBhZ2UuY29tcG9uZW50XCI7XG5pbXBvcnQge1Byb2R1Y3RMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi4vcHJvZHVjdC1saXN0L3Byb2R1Y3QtbGlzdC5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgU2VhcmNoUGFnZVJvdXRpbmdNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFNlYXJjaFBhZ2VDb21wb25lbnQsXG4gICAgICAgIFByb2R1Y3RMaXN0Q29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaFBhZ2VNb2R1bGUgeyB9XG4iXX0=