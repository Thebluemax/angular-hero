import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeroService } from 'src/app/core/services/hero.service';
import { SearchFormComponent } from '../search-form/search-form.component';
import { HerosComponent } from './heros.component';
import { Hero } from 'src/app/core/models/hero';

const heros = [
  {
    id: 1581812755,
    name: 'Brainiac 5',
    realName: 'Querl Dox',
    publisher: 'DC',
    group: 'Legion of Super-Heroes',
  },
  {
    id: 1581812924,
    name: 'Space Ghost',
    realName: 'Thaddeus Bach',
    publisher: 'Hanna-Barbera',
  },
  {
    id: 1581812924,
    name: 'Space Ghost',
    realName: 'Thaddeus Bach',
    publisher: 'Hanna-Barbera',
  },
  {
    id: 1581342712,
    name: 'Starman',
    realName: 'Thom Kallor',
    publisher: 'Dc',
    group: 'Legion of Super-Heroes',
  },
  {
    id: 1581812972,
    name: 'Wolverine',
    realName: 'James Logan',
    publisher: 'Marvel',
    group: 'X-Men',
  },
  {
    id: 1581812990,
    name: 'The Tick',
    realName: 'Unknown',
    publisher: 'New England Comics',
    group: 'Unknown',
  },
];

describe('HerosComponent', () => {
  let component: HerosComponent;
  let fixture: ComponentFixture<HerosComponent>;
  let service: HeroService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HerosComponent, SearchFormComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerosComponent);
    service = TestBed.inject(HeroService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Must have the initial setup', () => {
    expect(component.dataSource).toBeTruthy();
    expect(component.page).toBe(1);
    expect(component.rows).toBe(5);
    expect(component.herosTotal).toBe(0);
    expect(component.pageSizeOptions.length).toBe(4);
  });

  it('the paginator must have the default setUp ', () => {
    component.dataSource = heros;
    expect(component.paginator).toBeTruthy();
    expect(component.paginator.length).toBe(0);
    expect(component.paginator.pageSize).toBe(component.rows);
    expect(component.paginator.pageSizeOptions).toEqual(
      component.pageSizeOptions
    );
  });

  it('ngOnInit() must call getHeros()', () => {
    const spy = spyOn(component, 'getHeros').and.callFake(() => {
      return of({ heros: heros, total: heros.length });
    });
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('getHeros() must call getHeros() in the service and fill heros', () => {
    const spy = spyOn(service, 'getHeros').and.callFake(() => {
      return of({ heros: heros, total: heros.length });
    });
    component.rows = 999;
    fixture.detectChanges();
    component.getHeros();
    expect(spy).toHaveBeenCalled();
    expect(component.dataSource).toEqual(heros);
    expect(component.herosTotal).toEqual(heros.length);
  });

  it('search() must call getHerosByTerm() with the term and fill heros', () => {
    const word = 'test';
    const spy = spyOn(service, 'getHerosByTerm').and.callFake(() => {
      return of({ heros: heros, total: heros.length });
    });
    component.search(word);
    expect(spy).toHaveBeenCalledWith(word);
    expect(component.dataSource).toEqual(heros);
    expect(component.herosTotal).toEqual(heros.length);
  });

  it('editHero() must call navigate() with the rigth URL', () => {
    const url = [`/superhero/heros/${heros[0].id}`];

    const spy = spyOn(router, 'navigate').and.callFake(() => {
      return null;
    });
    component.editHero(heros[0]);
    expect(spy).toHaveBeenCalledWith(url);
  });

  it('deleteHero() must call deleteHero() with the rigth id an call deleteFromArray', () => {
    const spyService = spyOn(service, 'deleteHero').and.callFake(() => {
      return of({ msg: 'success' });
    });
    const spyDeleteFromArray = spyOn(component, 'deleteFromArray');
    component.deleteHero(heros[0]);
    expect(spyService).toHaveBeenCalledWith(heros[0].id);
    expect(spyDeleteFromArray).toHaveBeenCalledWith(heros[0].id);
  });

  it('deleteHero() must call deleteHero(), but not call deleteFromArray', () => {
    const spyService = spyOn(service, 'deleteHero').and.callFake(() => {
      return of({ msg: 'error' });
    });
    const spyDeleteFromArray = spyOn(component, 'deleteFromArray');
    spyDeleteFromArray.calls.reset();

    component.deleteHero(heros[1]);
    expect(spyService).toHaveBeenCalledWith(heros[1].id);
    expect(spyDeleteFromArray).not.toHaveBeenCalled();
  });

  it('deleteFromArray() must delete the rigth hero', () => {
    component.heroList = heros;
    component.herosTotal = heros.length;

    component.deleteFromArray(heros[0].id);
    expect(component.heroList.length).toBe(heros.length -1);
    expect(component.heroList[0]).toBe(heros[1]);
    expect(component.herosTotal).toBe(heros.length - 1);
  });

  it('paginateList()  paginate correctly', () => {
    const lengthList = heros.length;
    const page = 0;
    const size = 3;
    component.heroList = heros;
    const listPaginated: Hero[] = component.paginateList(page, size);
    expect(listPaginated.length).toBe(size);
    expect(listPaginated[0]).toEqual(heros[0]);
    expect(listPaginated[size - 1]).toEqual(heros[size - 1]);
    expect(component.herosTotal).toBe(length);
  });

  it('paginateList()  return the last evenly the size are out off array range', () => {
   
    const lengthList = heros.length;
    const page = 1;
    const size = 4;
    component.heroList = heros;
    const listPaginated: Hero[] = component.paginateList(page, size);
    expect(listPaginated.length).toBe(lengthList - size );
    expect(listPaginated[0]).toEqual(heros[size]);
    expect(listPaginated[listPaginated.length - 1]).toEqual(heros[lengthList - 1]);
  });

  it('paginateList()  return empty array if the page are out off array range', () => {
   
    const lengthList = heros.length;
    const page = 2;
    const size = 4;
    component.heroList = heros;
    const listPaginated: Hero[] = component.paginateList(page, size);
    expect(listPaginated.length).toBe(0);
    
  });

  it('onDestroy()  close al susbcriptions', () => {
   
    component.getHeros();
    (component.subscriptions[0].closed)
    expect(component.subscriptions[0].closed).toBeFalsy();
    component.onDestroy();
    expect(component.subscriptions[0].closed).not.toBeFalsy();
  });
});
