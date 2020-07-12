import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppService } from './app.services';
import { ISession } from '../models/sesion.interface';

@Injectable({
  providedIn: 'root'
})

class SessionService {

  localStorageService;
  currentSession: ISession = null;

  constructor() {
    this.localStorageService = localStorage;
  }

  /**
   * Set session variable with payload json {_id, email, token }
   */
  setSession = (session: ISession): void => {
    this.localStorageService.setItem('session', JSON.stringify(session));
  }

  loadSesionData = (): ISession => {
    const session = this.localStorageService.getItem('session');
    return session ? JSON.parse(session) as ISession : null;
  }

  getCurrentSession = () => {
    return this.loadSesionData();
  }

  getCurrentEmail = () => {
    const session: ISession = this.getCurrentSession();
    return (session && session.email) ? session.email : null;
  }

  getCurrentToken = () => {
    const session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  }

  isAuthenticated = (): boolean => {
    return (this.getCurrentToken() != null) ? true : false;
  }

  removeCurrentSession = (): void => {
    this.localStorageService.removeItem('session');
  }
}

export { SessionService };
