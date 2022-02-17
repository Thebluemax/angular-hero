import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(),
      realName: new FormControl(),
      publisher: new FormControl(),
      group: new FormControl(),
    })
  }

}
