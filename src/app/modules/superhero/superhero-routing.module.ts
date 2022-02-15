import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroComponent } from './page/superhero/superhero.component';

const routes: Routes = [
  { path:'', component: SuperheroComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperheroRoutingModule { }
