import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperheroComponent } from './page/superhero/superhero.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SuperheroRoutingModule } from './superhero-routing.module';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { HerosComponent } from './components/heros/heros.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeroService } from 'src/app/core/services/hero.service';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingInterceptor } from 'src/app/core/interceptors/loading.interceptor';



@NgModule({
  declarations: [
    HeroFormComponent,
    HerosComponent,
    SearchFormComponent,
    SuperheroComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    SuperheroRoutingModule,
  ],
  providers: [
    HeroService,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
      }
  ],
})
export class SuperheroModule { }
