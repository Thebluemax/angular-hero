import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormComponent } from './hero-form.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
const heros = [
  {
    id: 1581812755,
    name: "Brainiac 5",
    realName: "Querl Dox",
    publisher: "DC",
    group: "Legion of Super-Heroes"
  }, {
    id: 1581812924,
    name: "Space Ghost",
    realName: "Thaddeus Bach",
    publisher: "Hanna-Barbera"
  }
];
describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ 
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule,
        NoopAnimationsModule
      ],
      declarations: [ HeroFormComponent ],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {snapshot:
             {paramMap: 
              {
                get:() =>  heros[0].id
              }
            }
        }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init correctly', () => {
    const func =  spyOn(component,'getHero');
    component.ngOnInit();
    
    expect(func).toHaveBeenCalledWith(heros[0].id);
  });
});
