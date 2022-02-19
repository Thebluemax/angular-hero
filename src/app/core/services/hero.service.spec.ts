import { TestBed } from '@angular/core/testing';
import { of, Observable, from } from 'rxjs';

import { HeroService } from './hero.service';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/hero';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
}

export const herosMock:Hero[] = [
  {
    id: 1581812512,
    name: 'Vision',
    realName: 'Vision',
    publisher: 'Marvel',
    group: 'Avengers'
  },
  {
    id: 1581852712,
    name: 'Hulk',
    realName: 'David Baner',
    publisher: 'Marvel',
    group: 'Avengers'
  }
];

export const updateHeroMock:Hero = 
  {
    id: 1581852712,
    name: 'TestMan',
    realName: 'Jasmine',
    publisher: 'Angular',
    group: 'TypeScript'
  };

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [HeroService],
    });
    service = TestBed.get(HeroService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeros() return data', () => {

    service.getHeros()
    .subscribe( ({heros, total}) => {
      expect(total).toBe(herosMock.length);
      expect(heros).toEqual(herosMock);
    
    });
    const url = `${environment.apiUrl}`;
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    
    request.flush(herosMock)
  });

  it('getHeros() catch error', () => {

    service.getHeros()
    .subscribe( () => {
    },
    err=>{
      expect(err).toBe('opps!!');
    });
    const url = `${environment.apiUrl}`;
    const request = httpMock.expectOne(url);
    //expect(request.request.method).toBe('GET');
    
    request.error(new ErrorEvent('network error'))
  
  });

  it('getHero(heroId) return the hero', () => {

    service.getHero(herosMock[0].id)
    .subscribe( (hero:Hero) => {
      expect(hero).toEqual(herosMock[0]);
    
    });
    const url = `${environment.apiUrl}${herosMock[0].id}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    
    req.flush(herosMock[0])
  });

  it('getHero(heroId) catch error', () => {

    service.getHero(herosMock[0].id)
    .subscribe( () => {
    },
    err=>{
      expect(err).toBe('opps!!');
    });
    const url = `${environment.apiUrl}${herosMock[0].id}`;
    const request = httpMock.expectOne(url);
    //expect(request.request.method).toBe('GET');
    
    request.error(new ErrorEvent('network error'));
  });

  it('getHeroByTerm( term ) return a heros list', () => {
    const word = 'test';
    service.getHerosByTerm(word)
    .subscribe( ({heros, total}) => {
      expect(total).toBe(herosMock.length);
      expect(heros).toEqual(herosMock);
    
    });
    const url = `${environment.apiUrl}?name_like=${word}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    
    req.flush(herosMock)
  });

  it('getHerosByTerm( term ) catch error', () => {

    service.getHerosByTerm(herosMock[0].name)
    .subscribe( () => {
    },
    err=>{
      expect(err).toBe('opps!!');
    });
    const url = `${environment.apiUrl}?name_like=${herosMock[0].name}`;
    const request = httpMock.expectOne(url);
    
    request.error(new ErrorEvent('network error'));
  });

  it('getHeroByTerm( null ) not params in url and return a heros list', () => {
    const word = '';
    service.getHerosByTerm(word)
    .subscribe( ({heros, total}) => {
      expect(total).toBe(herosMock.length);
      expect(heros).toEqual(herosMock);
    
    });
    const url = environment.apiUrl;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    
    req.flush(herosMock)
  });

  it('updateHero( hero )  return a hero', () => {
    
    service.updateHero(updateHeroMock)
    .subscribe( (hero:Hero) => {
      expect(hero).toBe(updateHeroMock);
      
    });
    const url = `${environment.apiUrl}${updateHeroMock.id}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('PUT');
    
    req.flush(updateHeroMock)
  });

  it('updateHero( hero ) catch error', () => {

    service.updateHero(herosMock[0])
    .subscribe( () => {
    },
    err=>{
      expect(err).toBe('opps!!');
    });
    const url = `${environment.apiUrl}${herosMock[0].id}`;
    const request = httpMock.expectOne(url);
    
    request.error(new ErrorEvent('network error'));
  });
  
  it('deleteHero( hero )  return "success"', () => {
    
    service.deleteHero(updateHeroMock.id)
    .subscribe( (resp) => {
      expect(resp.msg).toBe('success');
      
    });
    const url = `${environment.apiUrl}${updateHeroMock.id}`;
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('DELETE');
    
    req.flush({})
  });

  it('deleteHero( hero ) catch error', () => {

    service.deleteHero(herosMock[0].id)
    .subscribe( () => {
    },
    err=>{
      expect(err).toBe('opps!!');
    });
    const url = `${environment.apiUrl}${herosMock[0].id}`;
    const request = httpMock.expectOne(url);
    
    request.error(new ErrorEvent('network error'));
  });
});
