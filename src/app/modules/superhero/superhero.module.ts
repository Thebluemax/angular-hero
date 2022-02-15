import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperheroComponent } from './page/superhero/superhero.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { SuperheroRoutingModule } from './superhero-routing.module';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { HerosComponent } from './components/heros/heros.component';



@NgModule({
  declarations: [
    SuperheroComponent,
    SearchFormComponent,
    HerosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SuperheroRoutingModule
  ]
})
export class SuperheroModule { }
