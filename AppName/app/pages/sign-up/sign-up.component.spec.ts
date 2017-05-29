import { TestBed, inject } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';

describe('a sign-up component', () => {
	let component: SignUpComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SignUpComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SignUpComponent], (SignUpComponent) => {
		component = SignUpComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});