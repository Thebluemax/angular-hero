import {Injectable, ɵɵresolveBody} from "@angular/core";
import {HeroInterface} from "./hero-service-interface";
import {Observable, pipe, map, catchError, throwError } from "rxjs";
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
    catchError( err=> {
        console.error(err);
        return throwError('opps!!')
      })
    );
  }
/**
 * 
 * @param hero 
 */
  getHero(hero : number): Observable<Hero> {

    return this.http.get<Hero>(`${this.apiUrl}${hero}`)
    .pipe(
      catchError( err=> {
        console.error(err);
        return throwError('opps!!')
      })
    );
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
    catchError( err=> {
      console.log(err);
      return throwError('opps!!')
    })
    );
  }
/**
 * 
 * @param hero 
 */
  updateHero(hero : Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}${hero.id}`, hero,{
        headers:this.headers
    })
    .pipe(
      catchError( err=> {
        console.log(err);
        return throwError('opps!!')
      })
    );
  }
/**
 * 
 * @param hero 
 */
  deleteHero(hero : number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${hero}`, {headers:this.headers})
    .pipe(
      map(resp => {return {msg:'success'}}),
        catchError( err=> {
          console.log(err);
          return throwError('opps!!')
        })
    );
  }

}
