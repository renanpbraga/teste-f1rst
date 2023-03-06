import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  NavigationExtras,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly location: Location,
    private readonly appService: AppService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.appService.currentUser.subscribe({
      next: (res: any) => {
        const isAuthenticated = res;
        if (!isAuthenticated) {
          const next = this.location.path(true);
          const navigateExtras: NavigationExtras = {
            queryParams: { next },
          };
          if (this.router.url !== '/auth/sign-in') {
            this.router.navigate(
              ['/auth/sign-in'],
              next ? navigateExtras : undefined
            );
          }
          return false;
        } else {
          return true;
        }
      },
    });
    return false;
  }
}
