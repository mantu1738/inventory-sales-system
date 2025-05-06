export interface Sale {
  id: string;
  itemId: string;
  quantity: number;
  totalPrice: number;
  soldBy: string; // userId
  soldAt: Date;
}