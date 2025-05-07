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
  dateAdded?: Date;
  lastUpdated?: Date;
}

export const CategoryDropDown = [
{
  label: 'Electronics',
  value: ItemCategory.ELECTRONICS,
},
{
  label: 'Furniture',
  value: ItemCategory.FURNITURE,
},
{
  label: 'Office Supplies',
  value: ItemCategory.OFFICE_SUPPLIES,
},
{
  label: 'Kitchen',
  value: ItemCategory.KITCHEN,
},
{
  label: 'Clothing',
  value: ItemCategory.CLOTHING,
},
{
  label: 'Other',
  value: ItemCategory.OTHER,
}
]

