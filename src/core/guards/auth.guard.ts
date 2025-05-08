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
        const requiredPermission = route.data['permissions'];
        this.authService.loadUserRole(user.roleId);
        if (requiredPermission) {
          const userPermissions = this.authService.currentRoleValue?.permissions || [];
          const requiredPermissionsArray = Array.isArray(requiredPermission) ? requiredPermission : [requiredPermission];
          const hasPermission = requiredPermissionsArray.some(p => userPermissions.includes(p));
          if (!hasPermission) {
            this.router.navigate(['**']);
            return false;
          }
        }

        return true;
      })
    );
  }
}
