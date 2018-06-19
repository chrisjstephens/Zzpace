import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleportationViewComponent } from './teleportation-view.component';

describe('TeleportationViewComponent', () => {
  let component: TeleportationViewComponent;
  let fixture: ComponentFixture<TeleportationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleportationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleportationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
