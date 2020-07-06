import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppService } from './app.services';
import { ISesion } from '../models/sesion.interface';

@Injectable({
  providedIn: 'root'
})

class SesionService {

  localStorageService;
  currentSesion: ISesion = null;

  constructor() {
    this.localStorageService = localStorage;
  }

  setSesion = (sesion: ISesion): void => {
    const { _id, email, token } = sesion;
    this.localStorageService.setItem('_id', _id);
    this.localStorageService.setItem('email', email);
    this.localStorageService.setItem('token', token);
  }

}

export { SesionService };
