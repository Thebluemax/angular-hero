import { NO_ERRORS_SCHEMA, Component, DebugElement } from '@angular/core';
import { UpercaseInputDirective } from './upercase-input.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: '<input type="text" appUpercaseInput>'
})
class TestInputComponent {
}

describe('UpercaseInputDirective', () => {
  let component: TestInputComponent;
  let fixture: ComponentFixture<TestInputComponent>;
  let inputEL: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[NoopAnimationsModule],
      declarations: [  TestInputComponent, UpercaseInputDirective ],
    });
    fixture = TestBed.createComponent(TestInputComponent);
    component = fixture.componentInstance;
    inputEL = fixture.debugElement;
    fixture.detectChanges(); 
  });

  it('should create an instance', () => {

    const directive = fixture.debugElement.query(By.directive(UpercaseInputDirective));
    expect(directive).not.toBeNull();
  });

  it('th imput should have the style atribute sett correctly', () => {
    const value = "uppercase";
    const directive = fixture.debugElement.query(By.directive(UpercaseInputDirective));
    fixture.detectChanges();
    expect(directive.nativeElement.style.textTransform).toBe(value);
  });
});
