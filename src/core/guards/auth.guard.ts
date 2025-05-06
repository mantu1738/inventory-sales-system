import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        const isLoggedIn = !!user;

        if (!isLoggedIn) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }

        // Check if route has required permissions
        const requiredPermission = route.data['permission'];
        console.log(route);
        if (requiredPermission) {
          const hasPermission = this.authService.currentRoleValue?.permissions.includes(requiredPermission);
          if (!hasPermission) {
            this.router.navigate(['/unauthorized']);
            return false;
          }
        }

        return true;
      })
    );
  }
}
