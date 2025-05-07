import { Component } from "@angular/core";
import { SalesService } from "../../core/services/sales.service";
import { Item } from "../../core/models/item.model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SpinnerLoaderComponent } from "../components/spinner-loader/spinner-loader.component";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  imports: [CommonModule, FormsModule, RouterModule, SpinnerLoaderComponent]
})

export class SalesComponent {
  items: Item[] = [];
  searchTerm = '';
  restockAmount: { [id: string]: number } = {};
  sellAmount: { [id: string]: number } = {};
  isSelling: { [id: string]: boolean } = {};
  isRestocking: { [id: string]: boolean } = {};
  isLoading = false;


  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.salesService.searchItem(this.searchTerm).subscribe((data) => {
      this.items = data;
      this.isLoading = false;
    });
  }

  sell(id: string): void {
    const quantity = this.sellAmount[id] || 1;
    this.isSelling[id] = true;
    this.salesService.sellItem(id, quantity).subscribe({
      next: () => this.loadItems(),
      error: (err) => alert(err.message),
      complete: () => (this.isSelling[id] = false),
    });
  }

  restock(id: string): void {
    const quantity = this.restockAmount[id] || 1;
    this.isRestocking[id] = true;
    this.salesService.restockItem(id, quantity).subscribe({
      next: () => this.loadItems(),
      complete: () => (this.isRestocking[id] = false),
    });
  }
}
