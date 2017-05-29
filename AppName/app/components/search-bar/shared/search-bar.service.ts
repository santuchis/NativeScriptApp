import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { SearchBar } from './search-bar.model';

@Injectable()
export class SearchBarService {

	constructor(private http: Http) { }

	getList(): Observable<SearchBar[]> {
		return this.http.get('/api/list').map(res => res.json() as SearchBar[]);
	}
}