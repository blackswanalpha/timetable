import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router,
    private authService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn())
      return true;

    this.router.navigate(['/login']);
    return false;

  }

}
