import { Injectable, ɵConsole } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { SessionService } from '../services/sesion.service';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private sessionService: SessionService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const session = this.sessionService.getCurrentSession();

    if (session && session.token) {
      request = request.clone({headers: request.headers.set(`Authorization`, `Bearer ${session.token}`)});
    }

    if (!request.headers.has(`Content-Type`)) {
      request = request.clone({headers: request.headers.set(`Content-Type`, `application/json`)});
    }

    request = request.clone({headers: request.headers.set(`Accept`, `application/json`)});

    console.log(request, '¿REQUEST?')

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event, '¿EVENT?')
          return event;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.sessionService.removeCurrentSession();
        }
        return throwError(err);
      })
    );
  }
}

export { AuthInterceptor };
