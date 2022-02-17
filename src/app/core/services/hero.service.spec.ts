import { TestBed } from '@angular/core/testing';
import { of, Observable, from } from 'rxjs';

import { HeroService } from './hero.service';
import { HttpClient } from '@angular/common/http';

class HttpClientMock {
  get = jasmine.createSpy('httpClient.get');
}

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpClientMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return the heros and total for pagination', () => {

    const heros = [
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
    httpMock.get.and.returnValue(of(heros));
    service.getHeros()
    .subscribe( value => {
            expect(value.total).toBe(heros.length);

            expect(value.heros).toEqual(heros);
    });
  });
});
