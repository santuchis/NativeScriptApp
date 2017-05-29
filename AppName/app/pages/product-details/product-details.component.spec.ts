import { TestBed, inject } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';

describe('a product-details component', () => {
	let component: ProductDetailsComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ProductDetailsComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ProductDetailsComponent], (ProductDetailsComponent) => {
		component = ProductDetailsComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});