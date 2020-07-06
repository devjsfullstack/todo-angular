import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { AppService } from './app.services';
import { Data } from '../models/todos.interface';

@Injectable({
  providedIn: 'root'
})

class TodoService {

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    body: {}
  };

  constructor(
    private http: HttpClient,
    private appService: AppService) {
  }

  todoCreate(todo: any): Observable<any> {
    return this.http.post(`${this.appService.url}/create`, todo, this.options).pipe(map(res => res));
  }

  todoPagination(skip: number, limit: number): Observable<any> {
    return this.http.get(`${this.appService.url}/pagination?skip=${skip}&limit=${limit}`, this.options)
    .pipe(map(res => res));
  }

  todoDelete(todo: Data): Observable<any> {
    this.options.body = todo; /* Set body */
    return this.http.delete(`${this.appService.url}/delete`, this.options).pipe(map(res => res));
  }
}

export { TodoService };
