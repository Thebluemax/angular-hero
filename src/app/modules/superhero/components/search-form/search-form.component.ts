import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Output() searchTerm: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  search(value:string){
    this.searchTerm.emit(value)
  }

}
