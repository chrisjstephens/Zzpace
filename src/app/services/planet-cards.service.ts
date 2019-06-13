import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanetCardsService {

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
        return this.http.get(environment.BACKEND_ADDRESS + '/api/showLocations');
  }
}
