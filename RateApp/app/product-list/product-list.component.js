"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Products = (function () {
    function Products(name) {
        this.name = name;
    }
    return Products;
}());
var productsList = ["IPhone", "Android", "TV", "Computer", "Play Station", "Router"];
var ProductListComponent = (function () {
    function ProductListComponent() {
        this.products = [];
        for (var i = 0; i < productsList.length; i++) {
            this.products.push(new Products(productsList[i]));
        }
    }
    ProductListComponent.prototype.ngOnInit = function () {
    };
    return ProductListComponent;
}());
ProductListComponent = __decorate([
    core_1.Component({
        selector: 'product-list',
        moduleId: module.id,
        templateUrl: "./product-list.component.html",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [])
], ProductListComponent);
exports.ProductListComponent = ProductListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2R1Y3QtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEU7QUFFMUU7SUFDSSxrQkFBbUIsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7SUFBSSxDQUFDO0lBQ3hDLGVBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUVELElBQUksWUFBWSxHQUFHLENBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQVFsRixJQUFhLG9CQUFvQjtJQUc3QjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRW5CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQztJQUNMLENBQUM7SUFFSix1Q0FBUSxHQUFSO0lBRUcsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSxvQkFBb0I7SUFOaEMsZ0JBQVMsQ0FBQztRQUNWLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNoQixXQUFXLEVBQUUsK0JBQStCO1FBQzVDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2xELENBQUM7O0dBQ1csb0JBQW9CLENBY2hDO0FBZFksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY2xhc3MgUHJvZHVjdHMge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHsgfVxufVxuXG5sZXQgcHJvZHVjdHNMaXN0ID0gW1wiSVBob25lXCIsXCJBbmRyb2lkXCIsXCJUVlwiLFwiQ29tcHV0ZXJcIiwgXCJQbGF5IFN0YXRpb25cIiwgXCJSb3V0ZXJcIl07XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3Byb2R1Y3QtbGlzdCcsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9wcm9kdWN0LWxpc3QuY29tcG9uZW50Lmh0bWxcIixcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBwdWJsaWMgcHJvZHVjdHM6IEFycmF5PFByb2R1Y3RzPjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnByb2R1Y3RzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWN0c0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdHMucHVzaChuZXcgUHJvZHVjdHMocHJvZHVjdHNMaXN0W2ldKSk7XG4gICAgICAgIH1cbiAgICB9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIFxuICAgIH1cbn0iXX0=