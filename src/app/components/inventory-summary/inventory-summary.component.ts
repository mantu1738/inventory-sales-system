import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Item } from '../../../core/models/item.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory-summary',
  imports:[CommonModule,RouterModule],
  templateUrl: './inventory-summary.component.html',
  styleUrls: ['./inventory-summary.component.css']
})
export class InventorySummaryComponent {
  @Input() inventoryItems!:Item[];
  constructor() { }
}
