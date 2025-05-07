import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';
import { RoleType } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'users';

  users = [
    {
      id: uuidv4(),
      username: 'super-admin',
      password: 'admin123',
      fullName: 'System Administrator',
      email: 'admin@example.com',
      roleId: RoleType.SUPER_ADMIN,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      username: 'admin',
      password: 'admin123', // In a real app, use proper hashing
      fullName: 'System Administrator',
      email: 'admin@example.com',
      roleId: RoleType.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      username: 'supervisor',
      password: 'supervisor123', // In a real app, use proper hashing
      fullName : 'System Supervisor',
      email: 'test@gmail.com',
      roleId: RoleType.SUPERVISOR,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      username: 'sales',
      password: 'sales123',
      fullName: 'System Sales',
      email: 'sales@gmail.com',
      roleId: RoleType.SALESPERSON,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  constructor(private storageService: StorageService) {
    // Initialize with default admin user if none exists
    this.getUsers().subscribe(users => {
      console.log(users);
      if (users.length === 0) {
       this.storageService.saveData(this.STORAGE_KEY, this.users);
      }
    });
  }

  getUsers(): Observable<User[]> {
    return this.storageService.getData<User>(this.STORAGE_KEY);
  }

  getUserById(id: string): Observable<User | null> {
    return this.storageService.getItemById<User>(this.STORAGE_KEY, id);
  }

  createUser(user: User): Observable<User> {
    return this.getUsers().pipe(
      map(users => {
        const newUser = {
          ...user,
          id: user.id || uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        users.push(newUser);
        this.storageService.saveData(this.STORAGE_KEY, users);
        return newUser;
      })
    );
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.getUserById(id).pipe(
      map(existingUser => {
        if (!existingUser) {
          throw new Error('User not found');
        }

        const updatedUser = {
          ...existingUser,
          ...user,
          updatedAt: new Date()
        };

        this.storageService.updateItem(this.STORAGE_KEY, id, updatedUser);
        return updatedUser;
      })
    );
  }

  deleteUser(id: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => {
        const userToDelete = users.find(u => u.id === id);

        if (!userToDelete) {
          throw new Error('User not found');
        }

        // Check if the user is an admin
        if (userToDelete.roleId === RoleType.ADMIN) {
          const adminCount = users.filter(u => u.roleId === RoleType.ADMIN).length;
          if (adminCount <= 1) {
            console.log('Cannot delete the last admin user.');
            return false;
          }
        }
        const updatedUsers = users.filter(user => user.id !== id);
        this.storageService.saveData(this.STORAGE_KEY, updatedUsers);
        return true;
      })
    );
  }

}
