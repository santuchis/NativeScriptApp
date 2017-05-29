import { Component, OnInit } from '@angular/core';

import { SearchBar } from './shared/search-bar.model';
import { SearchBarService } from './shared/search-bar.service';

@Component({
	selector: 'search-bar',
	moduleId: module.id,
	templateUrl: 'search-bar.component.html',
	providers: [SearchBarService]
})

export class SearchBarComponent implements OnInit {
	searchBar: SearchBar[] = [];

	constructor(private searchBarService: SearchBarService) { }

	ngOnInit() {
		this.searchBarService.getList().subscribe((res) => {
			this.searchBar = res;
		});
	}
}