import { Observable } from 'rxjs';
import { Hero } from '../models/hero';


export interface HeroInterface {

  getHeros(): Observable<{heros:Hero[], total:number}>;
  getHero(hero:number): Observable<Hero>;
  getHerosByTerm(term:string): Observable<Hero[]>;
  updateHero(hero: Hero): Observable<Hero>;
  deleteHero(hero: number): Observable<any>;
}
