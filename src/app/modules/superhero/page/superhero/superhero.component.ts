import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superhero',
  templateUrl: './superhero.component.html',
  styleUrls: ['./superhero.component.scss']
})

export class SuperheroComponent implements OnInit {
  title:string = 'SuperHero App';
  constructor() { }

  ngOnInit(): void {
  }

}
