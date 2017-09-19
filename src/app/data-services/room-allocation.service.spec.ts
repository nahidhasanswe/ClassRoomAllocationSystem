import { TestBed, inject } from '@angular/core/testing';

import { RoomAllocationService } from './room-allocation.service';

describe('RoomAllocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomAllocationService]
    });
  });

  it('should be created', inject([RoomAllocationService], (service: RoomAllocationService) => {
    expect(service).toBeTruthy();
  }));
});
