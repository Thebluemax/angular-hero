import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosComponent } from './heros.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
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

describe('HerosComponent', () => {
  let component: HerosComponent;
  let fixture: ComponentFixture<HerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerosComponent ],
      imports:[SharedModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Must have the initial setup', () => {
    expect(component.dataSource).toBeTruthy();
    expect(component.page).toBe(1);
    expect(component.rows).toBe(10);
    expect(component.herosTotal).toBe(0);
    expect(component.pageSizeOptions.length).toBe(4);
  });

  it('must a mat table and the headers number', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const matTable = compiled.querySelector('table.mat-table');
    expect(matTable).toBeTruthy();

    const headerLength = component.displayedColumns.length;
    const childrens = matTable?.querySelectorAll('th.mat-header-cell');

    expect(childrens?.length).toBe(headerLength);
  });

  it('the numbers of rows have to be the same number of heros', () => {
    component.dataSource.data = heros;
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tr.mat-row');

    expect( rows ).toBeTruthy();
    expect(rows?.length).toBe(heros.length);
  });

  it('the paginator must have the default setUp ', () => {
    component.dataSource.data = heros;
    expect(component.paginator).toBeTruthy();
    console.log(component.paginator.length);
    expect(component.paginator.length).toBe(0);
    expect(component.paginator.pageSize).toBe(component.rows);
    expect(component.paginator.pageSizeOptions).toEqual(component.pageSizeOptions);


    //const compiled = fixture.nativeElement as HTMLElement;
    //const rows = compiled.querySelectorAll('tr.mat-row');

    //expect( rows ).toBeTruthy();
    //expect(rows?.length).toBe(heros.length);
  });


});
