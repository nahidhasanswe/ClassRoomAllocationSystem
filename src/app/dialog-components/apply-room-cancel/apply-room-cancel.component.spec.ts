import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyRoomCancelComponent } from './apply-room-cancel.component';

describe('ApplyRoomCancelComponent', () => {
  let component: ApplyRoomCancelComponent;
  let fixture: ComponentFixture<ApplyRoomCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyRoomCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyRoomCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
