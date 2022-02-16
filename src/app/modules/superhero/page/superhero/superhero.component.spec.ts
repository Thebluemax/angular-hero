import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroComponent } from './superhero.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SuperheroComponent', () => {
  let component: SuperheroComponent;
  let fixture: ComponentFixture<SuperheroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperheroComponent ],
      imports: [RouterTestingModule,
        NoopAnimationsModule,
      SharedModule]
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

  it('must have a Mattoolbar tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')).not.toBeNull();
  });

  it('should render title in change', () => {
    const title = 'Test Title';
    expect( component.title ).toBe('SuperHero App');
    component.title = title;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span#main-title')?.textContent).toBe(title);
  });

  it('must have a router tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
