import { TestBed } from '@angular/core/testing';

import { DailyDealService } from './daily-deal.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DailyDealService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
       HttpClientTestingModule
      ],
      providers: [DailyDealService]
    });
  });

  it('should be created', () => {
    const service: DailyDealService = TestBed.get(DailyDealService);
    expect(service).toBeTruthy();
  });
});
