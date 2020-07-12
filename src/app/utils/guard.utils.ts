import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from 'src/app/services/sesion.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.sessionService.isAuthenticated();
    if (isAuth) {
      return isAuth;
    } else {
      this.router.navigateByUrl('login');
      return isAuth;
    }
  }

}

export { AuthGuard };
