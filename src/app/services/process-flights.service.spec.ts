import { TestBed } from '@angular/core/testing';

import { ProcessFlightsService } from './process-flights.service';

describe('ProcessFlightsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessFlightsService = TestBed.get(ProcessFlightsService);
    expect(service).toBeTruthy();
  });
});
