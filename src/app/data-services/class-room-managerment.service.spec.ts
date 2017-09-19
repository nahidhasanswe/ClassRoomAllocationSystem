import { TestBed, inject } from '@angular/core/testing';

import { ClassRoomManagermentService } from './class-room-managerment.service';

describe('ClassRoomManagermentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassRoomManagermentService]
    });
  });

  it('should be created', inject([ClassRoomManagermentService], (service: ClassRoomManagermentService) => {
    expect(service).toBeTruthy();
  }));
});
