import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role, RoleType } from '../models/role.model';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly STORAGE_KEY = 'roles';

  constructor(private storageService: StorageService) {
    // Initialize with default roles if none exist
    this.getRoles().subscribe(roles => {
      if (roles.length === 0) {
        const defaultRoles: Role[] = [
          {
            id: uuidv4(),
            name: 'Administrator',
            type: RoleType.ADMIN,
            permissions: ['user.manage', 'role.manage', 'item.manage', 'sales.manage', 'dashboard.view'],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: uuidv4(),
            name: 'Supervisor',
            type: RoleType.SUPERVISOR,
            permissions: ['item.manage', 'dashboard.view'],
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: uuidv4(),
            name: 'Sales Person',
            type: RoleType.SALESPERSON,
            permissions: ['sales.manage'],
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];
        this.storageService.saveData(this.STORAGE_KEY, defaultRoles).subscribe();
      }
    });
  }

  getRoles(): Observable<Role[]> {
    return this.storageService.getData<Role>(this.STORAGE_KEY);
  }

  getRoleById(id: string): Observable<Role | null> {
    return this.storageService.getItemById<Role>(this.STORAGE_KEY, id);
  }

  createRole(role: Role): Observable<Role> {
    return this.getRoles().pipe(
      map(roles => {
        const newRole = {
          ...role,
          id: role.id || uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        roles.push(newRole);
        this.storageService.saveData(this.STORAGE_KEY, roles);
        return newRole;
      })
    );
  }

  updateRole(id: string, role: Partial<Role>): Observable<Role> {
    return this.getRoleById(id).pipe(
      map(existingRole => {
        if (!existingRole) {
          throw new Error('Role not found');
        }

        const updatedRole = {
          ...existingRole,
          ...role,
          updatedAt: new Date()
        };

        this.storageService.updateItem(this.STORAGE_KEY, id, updatedRole);
        return updatedRole;
      })
    );
  }

  deleteRole(id: string): Observable<boolean> {
    return this.storageService.deleteItem(this.STORAGE_KEY, id);
  }
}
