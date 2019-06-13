import { TestBed } from '@angular/core/testing';

import { PlanetCardsService } from './planet-cards.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PlanetCardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
       HttpClientTestingModule
      ],
      providers: [PlanetCardsService]
    });
  });

  it('should be created', () => {
    const service: PlanetCardsService = TestBed.get(PlanetCardsService);
    expect(service).toBeTruthy();
  });
});
