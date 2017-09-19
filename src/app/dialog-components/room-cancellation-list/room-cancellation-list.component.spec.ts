import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCancellationListComponent } from './room-cancellation-list.component';

describe('RoomCancellationListComponent', () => {
  let component: RoomCancellationListComponent;
  let fixture: ComponentFixture<RoomCancellationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomCancellationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCancellationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
