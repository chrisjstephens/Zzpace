import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetCardsComponent } from './planet-cards.component';

import { HttpClientModule } from '@angular/common/http';

describe('PlanetCardsComponent', () => {
  let component: PlanetCardsComponent;
  let fixture: ComponentFixture<PlanetCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
       HttpClientModule
     ],
      declarations: [ PlanetCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
