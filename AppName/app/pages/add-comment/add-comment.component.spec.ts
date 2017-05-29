import { TestBed, inject } from '@angular/core/testing';

import { AddCommentComponent } from './add-comment.component';

describe('a add-comment component', () => {
	let component: AddCommentComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AddCommentComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([AddCommentComponent], (AddCommentComponent) => {
		component = AddCommentComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});