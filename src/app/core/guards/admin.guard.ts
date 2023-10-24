import { AuthService } from '@/services/auth.service';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';

export const AdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree | any>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(AuthService)
    .checkIsAdmin()
    .pipe(
      map((response: any) => {
        if (response.success) {
          return true;
        } else {
          inject(Router).navigate([]);
          return false;
        }
      })
    );
};
