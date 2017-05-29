import { TestBed, inject } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';

describe('a reset-password component', () => {
	let component: ResetPasswordComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ResetPasswordComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ResetPasswordComponent], (ResetPasswordComponent) => {
		component = ResetPasswordComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});