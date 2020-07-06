import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppService } from './app.services';
import { ILogin } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})

class LoginService {

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    body: {}
  };

  constructor(
    private http: HttpClient,
    private appService: AppService) {
  }

  login(credentials: ILogin): Observable<any> {
    return this.http.post(`${this.appService.url}/login`, credentials, this.options).pipe(map(res => res));
  }
}

export { LoginService };
