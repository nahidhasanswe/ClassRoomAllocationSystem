import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCancellationComponent } from './room-cancellation.component';

describe('RoomCancellationComponent', () => {
  let component: RoomCancellationComponent;
  let fixture: ComponentFixture<RoomCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
