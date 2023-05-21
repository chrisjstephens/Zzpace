import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromLogin from '../../store/login.reducer';
import * as LoginActions from '../../store/login.actions';

@Component({
  selector: 'app-header-view',
  templateUrl: './header-view.component.html',
  styleUrls: ['./header-view.component.css']
})
export class HeaderViewComponent implements OnInit, OnDestroy {
  isCollapsed = false;
  username$: Observable<any>;
  lolsubs: Subscription;
  username: String;

  constructor(private store: Store) { }

  ngOnInit() {
    this.username$ = this.store.select(fromLogin.getUserName1);
    this.lolsubs = this.username$.subscribe(
      data => { this.username = data; } // use.map since this is getting called too early
    );
  }

  ngOnDestroy() {
    this.lolsubs.unsubscribe();
  }

  logoutClick() {
    this.store.dispatch(LoginActions.LOGOUT_USER());
  }

}
