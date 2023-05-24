import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessHotelsService {

  constructor(private http: HttpClient) {
  }

  public getJSON(queryString: string): Observable<any> {
        return this.http.get(environment.BACKEND_ADDRESS + '/api/processHotels' + queryString ); // TODO: Change to post perhaps if get/post changes server state
  }
}
