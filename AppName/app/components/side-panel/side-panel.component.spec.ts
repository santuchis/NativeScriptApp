import { TestBed, inject } from '@angular/core/testing';

import { SidePanelComponent } from './side-panel.component';

describe('a side-panel component', () => {
	let component: SidePanelComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SidePanelComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SidePanelComponent], (SidePanelComponent) => {
		component = SidePanelComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});