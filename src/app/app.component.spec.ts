import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderViewComponent } from './views/header-view/header-view.component';

import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
       NgbModule, RouterTestingModule
      ],
      declarations: [
        AppComponent, HeaderViewComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
