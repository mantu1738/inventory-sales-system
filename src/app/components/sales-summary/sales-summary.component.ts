import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Sale } from '../../../core/models/sale.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sales-summary',
  imports:[CommonModule,RouterModule],
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./invesales-summary.component.css']
})
export class SalesSummaryComponent {
  @Input() salesData!:Sale[];
  constructor() { }
}
