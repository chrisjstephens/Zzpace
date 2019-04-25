import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsViewComponent } from './flights-view.component';

import { AppMaterialModule } from '../../modules/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('FlightsViewComponent', () => {
  let component: FlightsViewComponent;
  let fixture: ComponentFixture<FlightsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
       AppMaterialModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ReactiveFormsModule
     ],
      declarations: [ FlightsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
