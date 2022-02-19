import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogComponent } from './delete-dialog.component';
import { SharedModule } from '../../shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Hero } from 'src/app/core/models/hero';

export const heroMock:Hero = 
  {
    id: 1581852712,
    name: 'TestMan',
    realName: 'Jasmine',
    publisher: 'Angular',
    group: 'TypeScript'
  };

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ SharedModule, NoopAnimationsModule],
      declarations: [ DeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with open false', () => {
    expect(component.open).toBeFalsy();
  });

  it('openFrame() should set open true', () => {
    component.openFrame()
    expect(component.open).toBeTruthy();
  });

  it('cancel() should set open false, and emmit a empty event', () => {
    const spy  = spyOn(component.deleteHero, 'emit');
    component.cancel();
    expect(component.open).toBeFalsy();
    expect(component.deleteHero.emit).toHaveBeenCalledOnceWith();
    spy.calls.reset();
  });

  it('confirm() should set open false, and not emmit the hero', () => {
    spyOn(component.deleteHero, 'emit');
    component.hero  = heroMock;
    component.confirm();
    expect(component.open).toBeFalsy();
    expect(component.deleteHero.emit).toHaveBeenCalledWith(heroMock);
  });
});
