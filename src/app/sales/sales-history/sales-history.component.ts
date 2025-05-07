import { Component, OnInit } from '@angular/core';
import { Sale } from '../../../core/models/sale.model';
import { SalesService } from '../../../core/services/sales.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerLoaderComponent } from "../../components/spinner-loader/spinner-loader.component";


@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  imports: [CommonModule, RouterModule, SpinnerLoaderComponent],
})
export class SalesHistoryComponent implements OnInit {
  sales: Sale[] = [];
  isLoading = false;
  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.salesService.getSales().subscribe((data) => {
      this.sales = data.reverse();
      this.isLoading = false;
    });
  }
}
