import { TestBed, inject } from '@angular/core/testing';

import { RoomCancellationService } from './room-cancellation.service';

describe('RoomCancellationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomCancellationService]
    });
  });

  it('should be created', inject([RoomCancellationService], (service: RoomCancellationService) => {
    expect(service).toBeTruthy();
  }));
});
