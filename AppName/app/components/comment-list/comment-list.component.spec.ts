import { TestBed, inject } from '@angular/core/testing';

import { CommentListComponent } from './comment-list.component';

describe('a comment-list component', () => {
	let component: CommentListComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CommentListComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([CommentListComponent], (CommentListComponent) => {
		component = CommentListComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});