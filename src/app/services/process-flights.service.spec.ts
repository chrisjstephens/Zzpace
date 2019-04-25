import { TestBed } from '@angular/core/testing';

import { ProcessFlightsService } from './process-flights.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProcessFlightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
       HttpClientTestingModule
      ],
      providers: [ProcessFlightsService]
    });
  });

  it('should be created', () => {
    const service: ProcessFlightsService = TestBed.get(ProcessFlightsService);
    expect(service).toBeTruthy();
  });
});
