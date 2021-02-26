import { AuthService } from './../Service/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardsGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.AuthService.isLoggedIn) {
      console.log('i am login ' + this.AuthService.isLoggedIn);
      return true;
    } else {
      console.log('i am not login user' + this.AuthService.isLoggedIn);
      return this.router.navigate(['login']);
    }
  }
}
