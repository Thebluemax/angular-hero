import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Main Component routes file
 */

const routes: Routes = [
  {path: '', redirectTo:'/superhero/heros', pathMatch: 'full'},
  { path:'superhero', loadChildren: ()=> import('./modules/superhero/superhero.module')
                                          .then( m => m.SuperheroModule)},
  {path: '*', redirectTo:'/superhero/heros'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
