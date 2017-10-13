import { Component, OnInit,ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import { ProductService } from "../shared/services/product.service";
import { Product } from "../shared/model/product";

@Component({
	selector: 'product-list',
	moduleId: module.id,
    templateUrl: "./product-list.component.html",
    providers: [ProductService],
})
export class ProductListComponent implements OnInit{

    @Input() isRemoveIconVisible: boolean;
    @Input() productList : Product[];

    @Output() itemTap = new EventEmitter();
    
    constructor(private productService: ProductService) {}


	ngOnInit(): void {}

    public onItemTap(args) {
        console.log("ItemTapped:" + args.index);
        this.itemTap.emit(this.productList[args.index]);
    }

    public remove(index: number, productId : string) {
        console.log('remove ' + index);
        this.productList.splice(index, 1);
        this.productService.deleteSearchedProduct(productId).subscribe(
             () => {
                console.log("Exito en borrar producto");
             },
             () => {
                 console.log("Error en borrar producto");
             }
        );
    }
}