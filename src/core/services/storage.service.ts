import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private getRandomDelay(): number {
    // Random delay between 500-2500ms to simulate API calls
    return Math.floor(Math.random() * 2000) + 500;
  }

  getData<T>(key: string): Observable<T[]> {
    const data = localStorage.getItem(key);
    return of(data ? JSON.parse(data) : []).pipe(
      delay(this.getRandomDelay())
    );
  }

  getItemById<T>(key: string, id: string): Observable<T | null> {
    const data = localStorage.getItem(key);
    const items: T[] = data ? JSON.parse(data) : [];
    const item = items.find((item: any) => item.id === id) || null;
    return of(item).pipe(
      delay(this.getRandomDelay())
    );
  }

  saveData<T>(key: string, data: T[]): Observable<T[]> {
    localStorage.setItem(key, JSON.stringify(data));
    return of(data).pipe(
      delay(this.getRandomDelay())
    );
  }

  updateItem<T>(key: string, id: string, updatedItem: T): Observable<T> {
    const data = localStorage.getItem(key);
    let items: T[] = data ? JSON.parse(data) : [];
    items = items.map((item: any) => item.id === id ? updatedItem : item);
    localStorage.setItem(key, JSON.stringify(items));
    return of(updatedItem).pipe(
      delay(this.getRandomDelay())
    );
  }

  deleteItem(key: string, id: string): Observable<boolean> {
    const data = localStorage.getItem(key);
    let items: any[] = data ? JSON.parse(data) : [];
    items = items.filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(items));
    return of(true).pipe(
      delay(this.getRandomDelay())
    );
  }
}