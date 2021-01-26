import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromLogin from '../../store/login.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username$: Observable<any>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.username$ = this.store.select(fromLogin.getUserName1);
  }

}
