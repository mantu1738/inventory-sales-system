import { Injectable } from '@angular/core';
import { Observable, of, throwError, map } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Sale, SaleItem } from '../models/sale.model';
import { StorageService } from './storage.service';
import { ItemService } from './item.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private readonly STORAGE_KEY = 'sales';

  constructor(
    private storageService: StorageService,
    private itemService: ItemService
  ) {
    // Initialize with sample sales if none exist
    this.getSales().subscribe(sales => {
      if (sales.length === 0) {
        const sampleSales = [
          {
            id: uuidv4(),
            invoiceNumber: 'INV-2024-0001',
            customerName: 'John Doe',
            items: [
              {
                itemId: '1',
                name: 'Test Item 1',
                quantity: 2,
                price: 10.99,
                total: 21.98
              }
            ],
            subtotal: 21.98,
            total: 21.98,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: uuidv4(),
            invoiceNumber: 'INV-2024-0002',
            customerName: 'Jane Smith',
            items: [
              {
                itemId: '2',
                name: 'Test Item 2',
                quantity: 1,
                price: 25.50,
                total: 25.50
              },
              {
                itemId: '3',
                name: 'Test Item 3',
                quantity: 3,
                price: 5.99,
                total: 17.97
              }
            ],
            subtotal: 43.47,
            total: 43.47,
            createdAt: '2025-05-04T03:55:57.116Z',
            updatedAt: new Date()
          }
        ];
        this.storageService.saveData(this.STORAGE_KEY, sampleSales);
      }
    });
  }

  getSales(): Observable<Sale[]> {
    return this.storageService.getData<Sale>(this.STORAGE_KEY);
  }

  getSaleById(id: string): Observable<Sale | null> {
    return this.storageService.getItemById<Sale>(this.STORAGE_KEY, id);
  }

  createSale(sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>): Observable<Sale> {
    return this.getSales().pipe(
      map(sales => {
        // Generate invoice number (simple implementation)
        const invoiceNumber = `INV-${new Date().getFullYear()}-${String(sales.length + 1).padStart(4, '0')}`;

        const newSale: Sale = {
          ...sale,
          id: uuidv4(),
          invoiceNumber,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        sales.push(newSale);
        this.storageService.saveData(this.STORAGE_KEY, sales);
        return newSale;
      })
    );
  }

  updateSale(id: string, sale: Partial<Sale>): Observable<Sale> {
    return this.getSaleById(id).pipe(
      map(existingSale => {
        if (!existingSale) {
          throw new Error('Sale not found');
        }

        const updatedSale = {
          ...existingSale,
          ...sale,
          updatedAt: new Date()
        };

        this.storageService.updateItem(this.STORAGE_KEY, id, updatedSale);
        return updatedSale;
      })
    );
  }

  deleteSale(id: string): Observable<boolean> {
    return this.storageService.deleteItem(this.STORAGE_KEY, id);
  }

  // Helper method to calculate totals
  calculateTotals(items: SaleItem[]): { subtotal: number, total: number } {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    // For simplicity, we're just returning the subtotal as total
    // In a real app, you might add tax calculations here
    return { subtotal, total: subtotal };
  }

  // Get sales statistics for dashboard
  getSalesStats(): Observable<{
    totalSales: number,
    totalRevenue: number,
    recentSales: Sale[]
  }> {
    return this.getSales().pipe(
      map(sales => {
        const totalSales = sales.length;
        const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
        const recentSales = [...sales]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);

        return { totalSales, totalRevenue, recentSales };
      })
    );
  }
}
