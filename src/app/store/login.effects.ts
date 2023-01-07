import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LoginService } from '../services/login.service';
import * as LoginActions from './login.actions';

@Injectable()
export class LoginEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(LoginActions.LOGIN_START),
    switchMap((action) => {
       return this.loginService.login(action.formData)
       .pipe(
          map(resData => {
            localStorage.setItem('token', resData.token);
            localStorage.setItem('username', action.formData.username); // TODO: change to set full state not individual items
            return LoginActions.LOGIN_SUCCESS({ username: action.formData.username, token: resData.token, error: '' });
          }),
          catchError(errData => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            return of( LoginActions.LOGIN_ERROR({ error: 'Invalid login credentials' }));
          })
       );
     })
  );

  @Effect({ dispatch: false })
  successfullLogin = this.actions$.pipe(
    ofType(LoginActions.LOGIN_SUCCESS),
    tap(() =>  {
      this.router.navigate(['/user']);
    })
  );

  @Effect({ dispatch: false })
  loginRedirect = this.actions$.pipe(
    ofType(LoginActions.LOGIN_REDIRECT),
    tap((authed) => {
        this.router.navigate(['/login']);
    })
  );

  @Effect({ dispatch: false })
  logoutUser = this.actions$.pipe(
    ofType(LoginActions.LOGOUT_USER),
    tap(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['/']);
    })
  );

  // TODO: ERROR STATE

  constructor(private actions$: Actions, private loginService: LoginService, private router: Router) {}
}
