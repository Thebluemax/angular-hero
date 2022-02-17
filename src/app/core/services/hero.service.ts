import {Injectable, ɵɵresolveBody} from "@angular/core";
import {HeroInterface} from "./hero-service-interface";
import {Observable, pipe, map } from "rxjs";
import {Hero} from "../models/hero";
import {HttpClient, HttpParams, HttpHeaderResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "src/environments/environment";

@Injectable({providedIn: "root"})
export class HeroService implements HeroInterface {
  apiUrl: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http : HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getHeros(): Observable<{heros:Hero[], total:number}> {
    let params: HttpParams = new HttpParams();

    return this.http.get<Hero[]>(this.apiUrl,)
    .pipe(
      map((heros:Hero[]) => {
      return {
          heros: heros,
          total: heros.length
        };
    }),
    );
  }
/**
 * 
 * @param hero 
 */
  getHero(hero : number): Observable<Hero> {

    return this.http.get<Hero>(`${this.apiUrl}${hero}`);
  }
/**
 * 
 * @param term 
 */
  getHerosByTerm(term : string ): Observable<{heros:Hero[], total:number}> 
  {
    let params: HttpParams = new HttpParams()
    if (term) {
      params = params.set('name_like',term);
    }
    return this.http.get<Hero[]>(this.apiUrl, {params,headers:this.headers}).pipe(
      map((heros:Hero[]) => {
      return {
          heros: heros,
          total: heros.length
        };
    }),
    );
  }
/**
 * 
 * @param hero 
 */
  updateHero(hero : Hero): Observable<Hero> {
   
    return this.http.put<Hero>(`${this.apiUrl}${hero.id}`, hero,{
        headers:this.headers
    });
  }
/**
 * 
 * @param hero 
 */
  deleteHero(hero : number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${hero}`, {headers:this.headers})
    .pipe(
      map(resp => {return {msg:'success'}})
    );
  }
}
