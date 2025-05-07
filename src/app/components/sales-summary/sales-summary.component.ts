import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Sale } from '../../../core/models/sale.model';

@Component({
  selector: 'app-sales-summary',
  imports:[CommonModule],
  templateUrl: './sales-summary.component.html',
  styleUrls: ['./invesales-summary.component.css']
})
export class SalesSummaryComponent {
  @Input() salesData!:Sale[];
  constructor() { }
}
