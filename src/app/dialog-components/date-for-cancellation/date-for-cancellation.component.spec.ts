import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateForCancellationComponent } from './date-for-cancellation.component';

describe('DateForCancellationComponent', () => {
  let component: DateForCancellationComponent;
  let fixture: ComponentFixture<DateForCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateForCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateForCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
