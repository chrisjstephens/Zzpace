import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsViewComponent } from './hotels-view.component';

import { AppMaterialModule } from '../../modules/app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


describe('HotelsViewComponent', () => {
  let component: HotelsViewComponent;
  let fixture: ComponentFixture<HotelsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
       AppMaterialModule, BrowserAnimationsModule, FormsModule, HttpClientModule, ReactiveFormsModule
     ],
      declarations: [ HotelsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
