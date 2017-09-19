import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoutineComponent } from './my-routine.component';

describe('MyRoutineComponent', () => {
  let component: MyRoutineComponent;
  let fixture: ComponentFixture<MyRoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRoutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
