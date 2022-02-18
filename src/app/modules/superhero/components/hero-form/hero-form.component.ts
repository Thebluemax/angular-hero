import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Hero } from 'src/app/core/models/hero';
import { HeroService } from 'src/app/core/services/hero.service';
import { ErrorStateMatcher } from '@angular/material/core';

export const herosMock:Hero = 
  {
    id: 1581812512,
    name: 'Vision',
    realName: 'Jean Luc Vision',
    publisher: 'Marvel',
    group: 'Avengers'
  };

  export class CustomErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})

export class HeroFormComponent implements OnInit {
  msgRequied = 'Required!!';
  hero: Hero;

  subriptions: Subscription[] = []
  form: FormGroup;
  matcher = new CustomErrorStateMatcher();
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl({value:null, onlyRead:true}, Validators.required),
      name: new FormControl(null, Validators.required),
      realName: new FormControl(null, Validators.required),
      publisher: new FormControl(null, Validators.required),
      group: new FormControl(),
    });
    const heroId = this.activatedRoute.snapshot.paramMap.get("id");
    if (heroId) {
      this.getHero(parseInt(heroId));
    }
  }
/**
 * 
 */
  getHero(heroId:number){
    const subs = this.heroService.getHero(heroId)
    .subscribe( (hero:Hero) => {
      this.form.setValue({...hero});
      this.hero = hero;
    },
    err => {
      console.error(err)
    });
  }
  update(){
    const subs = this.heroService.updateHero({...this.form.getRawValue()})
      .subscribe( hero => {
        this.back();
      });
    this.subriptions.push(subs);
  }
  /**
   * 
   */
  hasError(field:string, rule:string){
    return this.form.get( field )?.getError( rule ) ? true : false;
  }
  /**
   * 
   */
  back(){
    this.router.navigate([`/superhero/heros`]);
  }
  /**
   * 
   */
  onDestroy(){
    this.subriptions.forEach(subscription => subscription.unsubscribe())
  }
}
