import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessRegisterService {

  constructor(private http: HttpClient) {
  }

  public submitData(formData: object): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      // todo:authorization token OR Authorization: 'my-auth-token'
      return this.http.post(environment.BACKEND_ADDRESS + '/api/addUser', formData, httpOptions );
  }
}
