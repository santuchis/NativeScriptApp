import { Component, OnInit,ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'rv-stars',
	moduleId: module.id,
    templateUrl: "./stars.component.html",
    styleUrls: ["./stars.component.css"]
})
export class StarsComponent implements OnInit{

    private emptyStar : string = "\uf006";
    private halfStar : string = "\uf123";
    private fullStar : string = "\uf005";

    @Input() value: number;
    @Output() starTapped = new EventEmitter();
    
    constructor() {}

	ngOnInit(): void {}


    // starPos=3 - value=2.3
    getIcon(starPosition : number) : string {
        if( starPosition <= this.value ) {
            return this.fullStar;
        }
        let dif = starPosition - this.value;
        if( dif < 0.25) {
            return this.fullStar;
        }
        if( dif < 0.75 ) {
            return this.halfStar;
        }
        return this.emptyStar;
    }

    onTap(starPosition : number) : void {
        this.starTapped.emit(starPosition);
    }
}