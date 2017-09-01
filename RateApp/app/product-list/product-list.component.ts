import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../shared/product/product';

@Component({
	selector: 'product-list',
	moduleId: module.id,
    templateUrl: "./product-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit{
    private products: Array<Product> = [
        new Product("1", "iPhone 7", "Apple"),
        new Product("2", "iPhone 7 Plus", "Apple"),
        new Product("3", "Galaxy s8", "Samsung"),
        new Product("4", "Galaxy s8 Edge", "Samsung"),
        new Product("5", "Play Station 4", "Sony"),
        new Product("6", "XBox One", "Microsoft")
    ];

    constructor() {}

	ngOnInit(): void {
        
    }
}