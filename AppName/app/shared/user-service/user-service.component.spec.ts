import { TestBed, inject } from '@angular/core/testing';

import { UserServiceComponent } from './user-service.component';

describe('a user-service component', () => {
	let component: UserServiceComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				UserServiceComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([UserServiceComponent], (UserServiceComponent) => {
		component = UserServiceComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});