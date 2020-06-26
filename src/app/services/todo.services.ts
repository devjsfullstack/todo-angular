import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AppService } from './app.services';

@Injectable({
  providedIn: 'root'
})

class TodoService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private appService: AppService) {
  }

  todoCreate(todo: any): Observable<any> {
    return this.http.post(`${this.appService.url}/create`, todo, { headers: this.headers }).pipe(map(res => res));
  }

  todoPagination(skip: number, limit: number): Observable<any> {
    return this.http.get(`${this.appService.url}/pagination?skip=${skip}&limit=${limit}`, { headers: this.headers })
    .pipe(map(res => res));
  }
}

export { TodoService };
