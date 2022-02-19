import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroComponent } from './superhero.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeroService } from 'src/app/core/services/hero.service';

describe('SuperheroComponent', () => {
  let component: SuperheroComponent;
  let fixture: ComponentFixture<SuperheroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheroComponent ],
      imports: [RouterTestingModule,
        NoopAnimationsModule,
      SharedModule],
      providers:[HeroService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroComponent);
    component = fixture.componentInstance;
    fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'superhero' by default`, () => {

    expect( component.title ).toBe('SuperHero App');

  });
});
