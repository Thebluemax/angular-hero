import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Hero } from 'src/app/core/models/hero';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  open:boolean;
  @Input() hero: Hero;
  @Output() deleteHero: EventEmitter<Hero> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  /**
   * 
   */
  openFrame(){
    this.open = true;
  }
  /**
   * 
   */
  confirm(){
    this.open = false;
    this.deleteHero.emit(this.hero);
  }
  /**
   * 
   */
  cancel(){
    this.open = false;
    this.deleteHero.emit();
  }

}
