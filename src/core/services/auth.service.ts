import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { RoleService } from './role.service';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private currentRoleSubject = new BehaviorSubject<Role | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();
  currentRole$ = this.currentRoleSubject.asObservable();

  constructor(
    private userService: UserService,
    private roleService: RoleService,
  ) {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.loadUserRole(user.roleId);
    }
  }

  login(username: string, password: string): Observable<User> {
    return this.userService.getUsers().pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
          throw new Error('Invalid username or password');
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.loadUserRole(user.roleId);

        return user;
      }),
      catchError(error => throwError(() => error))
    );
  }

  logout(): void {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.currentRoleSubject.next(null);
  }

  private loadUserRole(roleId: string): void {
    this.roleService.getRoleById(roleId).subscribe(role => {
      if (role) {
        this.currentRoleSubject.next(role);
      }
    });
  }

  hasPermission(permission: string): Observable<boolean> {
    return this.currentRole$.pipe(
      map(role => {
        if (!role) return false;
        return role.permissions.includes(permission);
      })
    );
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  get currentRoleValue(): Role | null {
    return this.currentRoleSubject.value;
  }
}
