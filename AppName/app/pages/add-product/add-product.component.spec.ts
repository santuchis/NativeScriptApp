import { TestBed, inject } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';

describe('a add-product component', () => {
	let component: AddProductComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AddProductComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([AddProductComponent], (AddProductComponent) => {
		component = AddProductComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});