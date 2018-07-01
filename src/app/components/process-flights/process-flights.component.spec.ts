import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessFlightsComponent } from './process-flights.component';

describe('ProcessFlightsComponent', () => {
  let component: ProcessFlightsComponent;
  let fixture: ComponentFixture<ProcessFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
