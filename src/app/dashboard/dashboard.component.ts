import { Component } from "@angular/core";
import { User } from "../../core/models/user.model";
import { AuthService } from "../../core/services/auth.service";
import { CommonModule } from "@angular/common";
import { ItemService } from "../../core/services/item.service";
import { Item } from "../../core/models/item.model";
import { SpinnerLoaderComponent } from "../components/spinner-loader/spinner-loader.component";
import { InventorySummaryComponent } from "../components/inventory-summary/inventory-summary.component";
import { Sale } from "../../core/models/sale.model";
import { SalesSummaryComponent } from "../components/sales-summary/sales-summary.component";
import { SalesService } from "../../core/services/sales.service";

@Component({
  selector: "app-dashboard",
  imports: [CommonModule, SpinnerLoaderComponent,InventorySummaryComponent,SalesSummaryComponent],
  templateUrl: "./dashboard.component.html",
  styleUrls:['./dashboard.component.css']
})

export class DashboardComponent {
  currentUser: User | null = null;
  totalItemSold: number = 0;
  totalItems: number = 0;
  mostPopularItem:Item[]=[];
  todayStr = new Date().toISOString().split('T')[0];
  isSpinnerLoading = true;
  inventoryItems: Item[] = [];
  salesData:Sale[]=[];
  totalSales: number = 0;
  constructor(
    private authService: AuthService,
    private salesService:SalesService,
    private itemService:ItemService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadDashboardData();
  }

  private loadDashboardData(): void {

    this.salesService.getSales().subscribe(sales => {
      this.totalItemSold = sales.reduce((total, sale) => total + sale.quantity, 0);
      const today = new Date().toISOString().split('T')[0];

      this.totalItems = sales
        .filter(sale => new Date(sale.date).toISOString().split('T')[0] === today)
        .reduce((total, sale) => total + sale.quantity, 0);

      this.salesData = sales.reverse();
      this.totalSales = sales.reduce((total, sale) => total + sale.totalPrice, 0);

      this.itemService.getItems().subscribe(items => {
        const maxReorderLevel = Math.max(
          ...items
            .filter(item => item.reorderLevel !== undefined)
            .map(item => Number(item.reorderLevel))
        );

        const itemsWithHighestReorderLevel = items.filter(
          item => Number(item.reorderLevel) === maxReorderLevel
        );

        this.mostPopularItem = itemsWithHighestReorderLevel;
        this.inventoryItems = items;
        this.isSpinnerLoading = false;
      });
    })
  }
}
