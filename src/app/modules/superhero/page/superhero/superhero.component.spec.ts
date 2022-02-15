import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroComponent } from './superhero.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared/shared.module';

describe('SuperheroComponent', () => {
  let component: SuperheroComponent;
  let fixture: ComponentFixture<SuperheroComponent>;
  let app:SuperheroComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheroComponent ],
      imports: [RouterTestingModule,
      SharedModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroComponent);
    component = fixture.componentInstance;
   // fixture.detectChanges();
    app = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it(`should have as title 'superhero' by default`, () => {

    expect( app.title ).toBe('SuperHero App');

  });

  it('should render title in change', () => {
    const title = 'Test Title';
    expect( app.title ).toBe('SuperHero App');
    app.title = title;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span#main-title')?.textContent).toBe(title);
  });
});
