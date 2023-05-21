import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';

import * as fromLogin from '../../store/login.reducer';
import { MatButton } from '@angular/material/button';

export interface Users {
  username: string;
  type: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  username$: Observable<any>;
  token$: Observable<any>;
  token: string;
  displayedColumns: string[] = ['username', 'type', 'deleteAction'];
  username: string;
  usersData;
  userForm: UntypedFormGroup;
  adminTabSuccessMessage: string;
  adminTabErrorMessage: string;
  updateError: string;
  updateSuccess = false;
  userError = false;
  usersError = false;

  constructor(private store: Store, private http: HttpClient) {
    this.createForm();
  }

  createForm() {
    this.userForm = new UntypedFormGroup({
        username2: new UntypedFormControl({value: '', disabled: true}, Validators.required),
        type: new UntypedFormControl({value: '', disabled: true}, Validators.required),
        firstName: new UntypedFormControl('', Validators.required),
        lastName: new UntypedFormControl('', Validators.required),
        gender: new UntypedFormControl('', Validators.required),
        address: new UntypedFormControl('', Validators.required),
        country: new UntypedFormControl('', Validators.required),
        phoneNumber: new UntypedFormControl('', Validators.required),
        dateOfBirth: new UntypedFormControl('', Validators.required)
      });
  }



  getUsersData() {
    const headers = new HttpHeaders().set('authorization', this.token);

    this.http.get<any>(environment.BACKEND_ADDRESS + '/api/admin/getUsers', { 'headers' : headers })
            .subscribe(data => {
              this.usersData = data;
              this.usersError = false;
            },
            error => {
              this.usersError = true;
            });
  }

  getUserData() {
    const headers = new HttpHeaders().set('authorization', this.token);

    this.http.get<any>(environment.BACKEND_ADDRESS + '/api/admin/user/' + this.username, { 'headers' : headers })
    .subscribe({
      next: data => {
        this.userForm.setValue({
          username2: data.username,
          type: data.type,
          firstName: data.info.firstName,
          lastName: data.info.lastName,
          gender: data.info.gender,
          address: data.info.address,
          country: data.info.country,
          phoneNumber: data.info.phoneNumber,
          dateOfBirth: data.info.dateOfBirth
        }),
        this.userError = false;
      },
      error: error => {
        this.userError = true;
      }
    });
  }

  deleteUser(username: string) {
    const headers = new HttpHeaders().set('authorization', this.token);

    this.http.delete<any>(environment.BACKEND_ADDRESS + '/api/admin/deleteUser/' + username,
      { 'headers' : headers, responseType: 'text' as 'json' })
    .subscribe({
      next: data => {
        this.getUsersData();
        this.adminTabSuccessMessage = data;
        this.adminTabErrorMessage = '';
      },
      error: error => {
        this.adminTabSuccessMessage = '';
        this.adminTabErrorMessage = error.error;
      }
    });
  }

  updateUser() {
    const bodyData = {
      info: {
          firstName: this.userForm.controls.firstName.value,
          lastName: this.userForm.controls.lastName.value,
          gender: this.userForm.controls.gender.value,
          address: this.userForm.controls.address.value,
          country: this.userForm.controls.country.value,
          phoneNumber: this.userForm.controls.phoneNumber.value,
          dateOfBirth: this.userForm.controls.dateOfBirth.value
      }
    };
    const headers = new HttpHeaders().set('authorization', this.token );

    this.http.put<any>(environment.BACKEND_ADDRESS + '/api/admin/updateUser/' + this.username, bodyData, { headers })
    .subscribe({
      next: data => {
        this.updateError = '';
        this.updateSuccess = true;
      },
      error: error => {
        this.updateError = error;
        this.updateSuccess = false;
      }
    });
  }

  ngOnInit() {
    this.username$ = this.store.select(fromLogin.getUserName1);
    this.token$ = this.store.select(fromLogin.getToken1);

    this.username$.subscribe(data => this.username = data);
    this.token$.subscribe(data => this.token = data);

    this.getUserData();

    if (this.username === 'admin') {
      this.getUsersData();
    }

    this.userForm.valueChanges.subscribe(changes => {
      this.updateError = '';
      this.updateSuccess = false;
    });
  }

}
