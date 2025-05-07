import { Component, OnInit } from '@angular/core';
import { AlertMessage, AlertService } from './alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports:[CommonModule],
  templateUrl: './alert.compoent.html',
})
export class GlobalAlertComponent implements OnInit {
  alert: AlertMessage | null = null;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe((alert) => {
      this.alert = alert;
    });
  }

  getAlertClass(): string {
    if (!this.alert) return 'alert-info';
    switch (this.alert.mode) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-danger';
      case 'info':
      default:
        return 'alert-info';
    }
  }

  dismiss() {
    this.alert = null;
  }
}
