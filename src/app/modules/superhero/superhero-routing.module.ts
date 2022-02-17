import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroComponent } from './page/superhero/superhero.component';
import { HerosComponent } from './components/heros/heros.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

const routes: Routes = [
  { path:'', component: SuperheroComponent, children:[
    { path: 'heros', component: HerosComponent },
    { path: 'heros/:id', component: HeroFormComponent }
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperheroRoutingModule { }
