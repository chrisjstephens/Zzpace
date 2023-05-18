import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';

import * as fromLogin from '../../store/login.reducer';
import { MatButton } from '@angular/material';


export interface Users {
  username: string;
  type: string;
}

const USER_DATA: Users[] = [
  {username: '1234', type: 'customer'},
  {username: '1234', type: 'customer'}
];

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
  userForm: FormGroup;
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
    this.userForm = new FormGroup({
        username2: new FormControl({value: '', disabled: true}, Validators.required),
        type: new FormControl({value: '', disabled: true}, Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.required)
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
        this.updateSuccess = false ;
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
