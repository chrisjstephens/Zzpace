import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromLogin from '../store/login.reducer';
import * as LoginActions from '../store/login.actions';

// Example taken from example app plateform from NGRX - https://github.com/ngrx/platform/tree/master/projects/example-app

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor(private store: Store) { }

  canActivate(): Observable<boolean> {
    return this.store.select(fromLogin.selectLoggedIn).pipe(
    map((authed) => {
      if (!authed) {
        this.store.dispatch(LoginActions.LOGIN_REDIRECT());
        return false;
      }
      return true;
    }),
    take(1)
    );
  }
}
