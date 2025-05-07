// import { Item } from './item.model';

export interface SaleItem {
  itemId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Sale {
  id: string;
  invoiceNumber: string;
  customerId?: string;
  customerName: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentMethod {
  CASH = 'Cash',
  CREDIT_CARD = 'Credit Card',
  DEBIT_CARD = 'Debit Card',
  BANK_TRANSFER = 'Bank Transfer',
  CHECK = 'Check',
  OTHER = 'Other'
}

export enum PaymentStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  PARTIAL = 'Partial',
  CANCELLED = 'Cancelled'
}
