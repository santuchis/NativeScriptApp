import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';

class Products {
    constructor(public name: string) { }
}

let productsList = ["IPhone","Android","TV","Computer", "Play Station", "Router"];

@Component({
	selector: 'product-list',
	moduleId: module.id,
    templateUrl: "./product-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit{
    public products: Array<Products>;

    constructor() {
        this.products = [];

        for (let i = 0; i < productsList.length; i++) {
            this.products.push(new Products(productsList[i]));
        }
    }

	ngOnInit(): void {
        
    }
}