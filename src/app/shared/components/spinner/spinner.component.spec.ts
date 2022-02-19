import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerService } from 'src/app/core/services/spinner.service';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let service: SpinnerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    service = TestBed.inject(SpinnerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('service must change value of open', () => {
    expect(component.open).not.toBeTruthy();
    service.setStatus(true);
    expect(component.open).toBeTruthy();
    service.setStatus(false);
    expect(component.open).not.toBeTruthy();

  });
});
