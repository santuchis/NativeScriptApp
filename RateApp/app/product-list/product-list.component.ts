import { Component, OnInit,ChangeDetectionStrategy,Input } from '@angular/core';
import { ProductService } from "../shared/services/product.service";
import { Product } from "../shared/model/product";

@Component({
	selector: 'product-list',
	moduleId: module.id,
    templateUrl: "./product-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ProductService],
})
export class ProductListComponent implements OnInit{

    public isRemoveIconVisible: boolean = false;
    
    @Input() productList : Product[];
    
    constructor(private productService: ProductService) {}


	ngOnInit(): void {}

    public onItemTap(args) {
        console.log("ItemTapped: " + args.index);
    }

    public remove(index: number) {
        console.log('remove ' + index);
    }
}