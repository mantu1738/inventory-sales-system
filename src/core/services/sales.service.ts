import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { StorageService } from './storage.service';
import { Item, ItemCategory } from '../models/item.model';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private readonly ITEM_KEY = 'items';
  private readonly SALES_KEY = 'sales';

  constructor(private storageService: StorageService) {

    // Initialize sales data if not already present
    this.storageService.getData<Sale>(this.SALES_KEY).subscribe((sales) => {
      if (!sales || sales.length === 0) {
      const initialSales: Sale[] = [
        {
        id: uuidv4(),
        itemId: '1',
        itemName: 'Sample Item 1',
        category: ItemCategory.ELECTRONICS,
        quantity: 2,
        unitPrice: 50,
        totalPrice: 100,
        date: new Date(),
        },
        {
        id: uuidv4(),
        itemId: '2',
        itemName: 'Sample Item 2',
        category: ItemCategory.CLOTHING,
        quantity: 1,
        unitPrice: 150,
        totalPrice: 150,
        date: new Date(),
        },
      ];
      this.storageService.saveData<Sale>(this.SALES_KEY, initialSales).subscribe();
      }
    });

  }

  sellItem(id: string, quantity: number): Observable<Item> {
    return this.storageService.getItemById<Item>(this.ITEM_KEY, id).pipe(
      switchMap((item) => {
        if (!item) {
          return throwError(() => new Error('Item not found.'));
        }
        if (item.stockQuantity < quantity) {
          return throwError(() => new Error('Not enough stock.'));
        }

        // Update stock
        const updatedItem: Item = {
          ...item,
          stockQuantity: item.stockQuantity - quantity,
          lastUpdated: new Date(),
        };

        // Create sale record
        const sale: Sale = {
          id: uuidv4(),
          itemId: item.id,
          itemName: item.name,
          category: item.category,
          quantity,
          unitPrice: item.price,
          totalPrice: item.price * quantity,
          date: new Date(),
        };

        return this.storageService.updateItem<Item>(this.ITEM_KEY, id, updatedItem).pipe(
          switchMap(() =>
            this.storageService.getData<Sale>(this.SALES_KEY).pipe(
              switchMap((sales) =>
                this.storageService.saveData<Sale>(this.SALES_KEY, [...sales, sale])
              ),
              map(() => updatedItem)
            )
          )
        );
      })
    );
  }

  restockItem(id: string, quantity: number): Observable<Item> {
    return this.storageService.getItemById<Item>(this.ITEM_KEY, id).pipe(
      switchMap((item) => {
        if (!item) {
          return throwError(() => new Error('Item not found.'));
        }
        const updatedItem: Item = {
          ...item,
          stockQuantity: item.stockQuantity + quantity,
          lastUpdated: new Date(),
        };
        return this.storageService.updateItem<Item>(this.ITEM_KEY, id, updatedItem);
      })
    );
  }

  searchItem(term: string): Observable<Item[]> {
    const lowerTerm = term.toLowerCase();
    return this.storageService.getData<Item>(this.ITEM_KEY).pipe(
      map((items) =>
        items.filter(
          (item) =>
            item.name.toLowerCase().includes(lowerTerm) ||
            item.description.toLowerCase().includes(lowerTerm) ||
            item.category.toLowerCase().includes(lowerTerm)
        )
      )
    );
  }

  getSales(): Observable<Sale[]> {
    return this.storageService.getData<Sale>(this.SALES_KEY);
  }
}
