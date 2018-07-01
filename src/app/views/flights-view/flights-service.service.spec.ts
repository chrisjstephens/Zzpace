import { TestBed, inject } from '@angular/core/testing';

import { FlightsServiceService } from './flights-service.service';

describe('FlightsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlightsServiceService]
    });
  });

  it('should be created', inject([FlightsServiceService], (service: FlightsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
