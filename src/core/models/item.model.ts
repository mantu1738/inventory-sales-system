export enum ItemCategory {
  ELECTRONICS = 'Electronics',
  FURNITURE = 'Furniture',
  OFFICE_SUPPLIES = 'Office Supplies',
  KITCHEN = 'Kitchen',
  CLOTHING = 'Clothing',
  OTHER = 'Other'
}

export interface Item {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  price: number;
  stockQuantity: number;
  reorderLevel: number;
  dateAdded: Date;
  lastUpdated: Date;
}
