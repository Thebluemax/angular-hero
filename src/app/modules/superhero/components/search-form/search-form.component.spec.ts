import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports:[SharedModule, NoopAnimationsModule],
      declarations: [ SearchFormComponent ]
    })
    .compileComponents();

  });

  beforeEach(() => {

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

  it(`should have a material input`, () => {

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[matInput]')).toBeTruthy();

  });

  it('input trigger search emmiter', () => {

    const term = 'Test Word';
    component.searchTerm.subscribe( (word:string) => {
      expect(word).toBe(term)
    } )  
    component.search(term);
    
  });
});
