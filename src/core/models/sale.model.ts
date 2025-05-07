// sales.model.ts
import { ItemCategory } from './item.model';

export interface Sale {
  id: string;
  itemId: string;
  itemName: string;
  category: ItemCategory;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  date: Date;
}
