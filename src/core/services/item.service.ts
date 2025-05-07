import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Item, ItemCategory } from '../models/item.model';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly STORAGE_KEY = 'items';
  private items: Item[] = [
    {
      id: '1',
      name: 'Laptop',
      description: 'High-performance business laptop',
      category: ItemCategory.ELECTRONICS,
      price: 1200,
      stockQuantity: 15,
      reorderLevel: 5,
      dateAdded: new Date('2023-01-15'),
      lastUpdated: new Date('2023-01-15')
    },
    {
      id: '2',
      name: 'Office Chair',
      description: 'Ergonomic office chair with lumbar support',
      category: ItemCategory.FURNITURE,
      price: 250,
      stockQuantity: 8,
      reorderLevel: 3,
      dateAdded: new Date('2023-02-10'),
      lastUpdated: new Date('2023-02-10')
    },
    {
      id: '3',
      name: 'Wireless Mouse',
      description: 'Bluetooth wireless mouse',
      category: ItemCategory.ELECTRONICS,
      price: 35,
      stockQuantity: 25,
      reorderLevel: 10,
      dateAdded: new Date('2023-01-20'),
      lastUpdated: new Date('2023-01-20')
    },
    {
      id: '4',
      name: 'Desk Lamp',
      description: 'LED desk lamp with adjustable brightness',
      category: ItemCategory.OFFICE_SUPPLIES,
      price: 45,
      stockQuantity: 12,
      reorderLevel: 50,
      dateAdded: new Date('2023-03-05'),
      lastUpdated: new Date('2023-03-05')
    },
    {
      id: '5',
      name: 'Notebook Set',
      description: 'Set of 3 premium notebooks',
      category: ItemCategory.OFFICE_SUPPLIES,
      price: 15,
      stockQuantity: 30,
      reorderLevel: 10,
      dateAdded: new Date('2023-02-25'),
      lastUpdated: new Date('2023-02-25')
    }
  ];

  constructor(private storageService: StorageService) {

    // Initialize with default items if none exist
    this.getItems().subscribe(items => {
      if (items.length === 0) {
        this.storageService.saveData(this.STORAGE_KEY, this.items);
      } else {
        this.items = items;
      }
    });

   }

  getItems(): Observable<Item[]> {
    // return of(this.items).pipe(delay(800));
     return this.storageService.getData<Item>(this.STORAGE_KEY);
  }

  getItemById(id: string): Observable<Item | null> {
     return this.storageService.getItemById<Item>(this.STORAGE_KEY, id);
  }

  createItem(item: Omit<Item, 'id' | 'dateAdded' | 'lastUpdated'>): Observable<Item> {
    const newItem: Item = {
      ...item,
      id: uuidv4(),
      dateAdded: new Date(),
      lastUpdated: new Date()
    };

    this.items.push(newItem);
    this.storageService.saveData(this.STORAGE_KEY, this.items);
    return of(newItem).pipe(delay(800));
  }

  updateItem(id: string, item: Partial<Item>): Observable<Item> {
    // const index = this.items.findIndex(i => i.id === id);
    // if (index === -1) {
    //   return throwError(() => new Error('Item not found'));
    // }

    // const updatedItem: Item = {
    //   ...this.items[index],
    //   ...item,
    //   lastUpdated: new Date()
    // };

    // this.items[index] = updatedItem;
    // this.storageService.saveData(this.STORAGE_KEY, this.items);
    // return of(updatedItem).pipe(delay(800));
    return this.getItemById(id).pipe(
          map(existingItem => {
            if (!existingItem) {
              throw new Error('Role not found');
            }

            const updatedItem = {
              ...existingItem,
              ...item,
              updatedAt: new Date()
            };

            console.log('Updated Item', updatedItem);

            this.storageService.updateItem(this.STORAGE_KEY, id, updatedItem);
            return updatedItem;
          })
        );
  }

  deleteItem(id: string): Observable<boolean> {
    return this.storageService.deleteItem(this.STORAGE_KEY, id);
  }

  getLowStockItems(): Observable<Item[]> {
    const lowStockItems = this.items.filter(item => item.stockQuantity <= item.reorderLevel);
    return of(lowStockItems).pipe(delay(500));
  }
}
