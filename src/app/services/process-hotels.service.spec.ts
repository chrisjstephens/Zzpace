import { TestBed } from '@angular/core/testing';

import { ProcessHotelsService } from './process-hotels.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProcessHotelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
       HttpClientTestingModule
      ],
      providers: [ProcessHotelsService]
    });
  });

  it('should be created', () => {
    const service: ProcessHotelsService = TestBed.get(ProcessHotelsService);
    expect(service).toBeTruthy();
  });
});
