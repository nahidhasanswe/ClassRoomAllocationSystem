import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAllocationListComponent } from './room-allocation-list.component';

describe('RoomAllocationListComponent', () => {
  let component: RoomAllocationListComponent;
  let fixture: ComponentFixture<RoomAllocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAllocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
