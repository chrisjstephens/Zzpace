import { TestBed } from '@angular/core/testing';

import { ProcessRegisterService } from './process-register.service';

describe('ProcessRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessRegisterService = TestBed.get(ProcessRegisterService);
    expect(service).toBeTruthy();
  });
});
