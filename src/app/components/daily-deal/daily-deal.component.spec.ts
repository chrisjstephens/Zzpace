import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDealComponent } from './daily-deal.component';

import { HttpClientModule } from '@angular/common/http';

describe('DailyDealComponent', () => {
  let component: DailyDealComponent;
  let fixture: ComponentFixture<DailyDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ DailyDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
