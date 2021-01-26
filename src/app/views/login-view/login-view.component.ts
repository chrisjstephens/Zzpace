import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import * as fromLogin from '../../store/login.reducer';
import * as LoginActions from '../../store/login.actions';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit, DoCheck, OnDestroy  {
  loginForm: FormGroup;
  loginData: object;
  loginError = false;
  username$: Observable<any>;
  error$: Observable<any>;
  lolsubs: Subscription;
  username: String;

  // Store<fromLogin>
  constructor(private store: Store, private loginService: LoginService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
     this.username$ = this.store.select(fromLogin.getUserName1);
     this.error$ = this.store.select(fromLogin.getError1);

     this.lolsubs = this.username$.subscribe(
       data => { this.username = data; } // use.map since this is getting called too early
     );
  }

  ngDoCheck() {
    if (this.username) {
       this.router.navigate(['/user']); // TODO: add this to effect
    }
    // Normally you build containers and components. You build a container responsible for getting the data from the store, which you then
    // pass with the async pipe to the next container or component which is responsible for the display.
    // With ngOnChanges you can detect changes and update the frontend accordingly.
  }

  ngOnDestroy() {
    this.lolsubs.unsubscribe();
  }

  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.store.dispatch(LoginActions.LOGIN_START({ formData: this.loginForm.value }));
  }

}
