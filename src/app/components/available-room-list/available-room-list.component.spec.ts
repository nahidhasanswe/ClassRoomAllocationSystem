import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableRoomListComponent } from './available-room-list.component';

describe('AvailableRoomListComponent', () => {
  let component: AvailableRoomListComponent;
  let fixture: ComponentFixture<AvailableRoomListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableRoomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
