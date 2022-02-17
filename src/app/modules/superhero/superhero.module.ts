import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperheroComponent } from './page/superhero/superhero.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { SuperheroRoutingModule } from './superhero-routing.module';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { HerosComponent } from './components/heros/heros.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroService } from 'src/app/core/services/hero.service';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SuperheroComponent,
    SearchFormComponent,
    HerosComponent,
    HeroFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    SuperheroRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    HeroService
  ]
})
export class SuperheroModule { }
