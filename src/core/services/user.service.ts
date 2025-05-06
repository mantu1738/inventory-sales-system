import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'users';

  constructor(private storageService: StorageService) {
    // Initialize with default admin user if none exists
    this.getUsers().subscribe(users => {
      if (users.length === 0) {
        const adminUser: User = {
          id: uuidv4(),
          username: 'admin',
          password: 'admin123', // In a real app, use proper hashing
          fullName: 'System Administrator',
          email: 'admin@example.com',
          roleId: 'admin-role',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const supervisingUser: User = {
          id: uuidv4(),
          username: 'supervisor',
          password: 'supervisor123', // In a real app, use proper hashing
          fullName : 'System Supervisor',
          email: 'test@gmail.com',
          roleId: 'supervisor-role',
          createdAt: new Date(),
          updatedAt: new Date()
        }

        const salesUser: User = {
          id: uuidv4(),
          username: 'sales',
          password: 'sales123',
          fullName: 'System Sales',
          email: 'sales@gmail.com',
          roleId: 'sales-role',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        this.createUser(adminUser).subscribe();
        this.createUser(supervisingUser).subscribe();
        this.createUser(salesUser).subscribe();
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
    return this.storageService.deleteItem(this.STORAGE_KEY, id);
  }
}
