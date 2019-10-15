import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { HomeViewComponent } from './home-view.component';
import { PlanetCardsComponent } from '../../components/planet-cards/planet-cards.component';
import { DailyDealComponent } from '../../components/daily-deal/daily-deal.component';

describe('HomeViewComponent', () => {
  let component: HomeViewComponent;
  let fixture: ComponentFixture<HomeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
       HttpClientModule
     ],
      declarations: [ HomeViewComponent, DailyDealComponent, PlanetCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
