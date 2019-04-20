import { TestBed } from '@angular/core/testing';

import { ProcessHotelsService } from './process-hotels.service';

describe('ProcessHotelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessHotelsService = TestBed.get(ProcessHotelsService);
    expect(service).toBeTruthy();
  });
});
