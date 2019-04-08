import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterService } from '../shared/register.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private registerService: RegisterService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if token expired
    if (!this.registerService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
      this.registerService.deleteToken();
      return false;
    }
    return true;
  }
}
