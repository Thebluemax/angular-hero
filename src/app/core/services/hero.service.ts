import {Injectable, ɵɵresolveBody} from "@angular/core";
import {HeroInterface} from "./hero-service-interface";
import {Observable, pipe, map} from "rxjs";
import {Hero} from "../models/hero";
import {HttpClient, HttpParams, HttpHeaderResponse} from "@angular/common/http";
import {environment} from "src/environments/environment";

@Injectable({providedIn: "root"})
export class HeroService implements HeroInterface {
  apiUrl: string;
  constructor(private http : HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getHeros(): Observable<{heros:Hero[], total:number}> {
    let params: HttpParams = new HttpParams();

    return this.http.get<Hero[]>(this.apiUrl,)
    .pipe(
      map((heros) => {
        console.log(heros)
      return {
        heros: heros,
         total: heros.length
        };
    }),
    );
  }

  getHero(hero : number): Observable<Hero> {
    return this.http.get<Hero>(this.apiUrl);
  }

  getHerosByTerm(term : string): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  updateHero(hero : Hero): Observable<Hero> {
    return this.http.get<Hero>(this.apiUrl);
  }

  deleteHero(hero : number): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
