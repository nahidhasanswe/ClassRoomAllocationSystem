import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyRoomComponent } from './apply-room.component';

describe('ApplyRoomComponent', () => {
  let component: ApplyRoomComponent;
  let fixture: ComponentFixture<ApplyRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
