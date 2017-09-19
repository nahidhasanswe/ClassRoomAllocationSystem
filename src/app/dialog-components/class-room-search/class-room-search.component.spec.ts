import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomSearchComponent } from './class-room-search.component';

describe('ClassRoomSearchComponent', () => {
  let component: ClassRoomSearchComponent;
  let fixture: ComponentFixture<ClassRoomSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassRoomSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassRoomSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
