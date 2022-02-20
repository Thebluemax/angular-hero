import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormComponent } from './hero-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroService } from 'src/app/core/services/hero.service';
import { of } from 'rxjs';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
];

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let service: HeroService;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [HeroFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => heros[0].id,
              },
            },
          },
        },
        {
          provide: Router,
          useValue: routerSpy
        }
        
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HeroService);
   // router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init correctly', () => {
    const func = spyOn(component, 'getHero');
    component.ngOnInit();

    expect(func).toHaveBeenCalledWith(heros[0].id);
  });

  it('getHero() call get hero in server and fill data', () => {
    const subsLength = component.subscriptions.length;
    const func = spyOn(service, 'getHero').and.callFake(() => {
      return of({
        ...heros[0],
      });
    });
    component.getHero(heros[0].id);
    expect(func).toHaveBeenCalledWith(heros[0].id);
    expect(component.form.getRawValue()).toEqual(heros[0]);
    expect(component.subscriptions.length).toEqual(subsLength + 1);
  });

  it('update() call get updateHero in service and call back', () => {
    const subsLength = component.subscriptions.length;
    component.form.setValue(heros[0]);
    const back = spyOn(component, 'back');
    const func = spyOn(service, 'updateHero').and.callFake(() => {
      return of({
        ...heros[0],
      });
    });
    component.update();
    expect(func).toHaveBeenCalledWith(heros[0]);
    expect(back).toHaveBeenCalled();
    expect(component.subscriptions.length).toEqual(subsLength + 1);
  });

  it('hasError() must be true to all, execepts group and id', () => {
    Object.keys(component.form.controls).forEach((key) => {
      switch (key) {
        case 'id':
        case 'group':
          expect(component.hasError(key, 'required')).not.toBeTruthy();
          break;
        default:
          expect(component.hasError(key, 'required')).toBeTruthy();
          break;
      }
    });
  });

  it('hasError() must be false to all ', () => {
    component.form.setValue(heros[0]);
    Object.keys(component.form.controls).forEach((key) => {
      expect(component.hasError(key, 'required')).toBeFalsy();
    });
  });


  it('back() must call navigate ', () => {
    routerSpy.navigate.and.callFake(():any => {
      return null;
    });
    component.back();
    expect(routerSpy.navigate).toHaveBeenCalledWith([`/superhero/heros`])
  });

  it('onDestroy()  close al susbcriptions', () => {
   
    component.update();
    (component.subscriptions[0].closed)
    expect(component.subscriptions[0].closed).toBeFalsy();
    component.onDestroy();
    expect(component.subscriptions[0].closed).not.toBeFalsy();
  });

});
