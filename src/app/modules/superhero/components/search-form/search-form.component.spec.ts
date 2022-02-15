import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      console.log(word)
      expect(word).toBe(term)
    } )
    component.search(term);
   // fixture.detectChanges();
   // const compiled = fixture.nativeElement as HTMLElement;
   // expect(compiled.querySelector('span#main-title')?.textContent).toBe(title);
  });
});
