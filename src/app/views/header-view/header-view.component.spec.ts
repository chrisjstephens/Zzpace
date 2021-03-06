import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderViewComponent } from './header-view.component';
import { loginReducer } from '../../store/login.reducer';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('HeaderViewComponent', () => {
  let component: HeaderViewComponent;
  let fixture: ComponentFixture<HeaderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
       NgbModule, RouterModule, RouterTestingModule, StoreModule.forRoot({login: loginReducer})
     ],
      declarations: [ HeaderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
