import { TestBed, inject } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';

describe('a sign-in component', () => {
	let component: SignInComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SignInComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SignInComponent], (SignInComponent) => {
		component = SignInComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});