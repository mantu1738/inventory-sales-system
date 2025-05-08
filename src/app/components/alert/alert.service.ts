import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert, AlertType } from './alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  alert$ = this.alertSubject.asObservable();

  showSuccess(message: string): void {
    this.alertSubject.next({
      message,
      type: AlertType.SUCCESS
    });
  }

  showError(message: string): void {
    this.alertSubject.next({
      message,
      type: AlertType.ERROR
    });
  }

  showWarning(message: string): void {
    this.alertSubject.next({
      message,
      type: AlertType.WARNING
    });
  }

  showInfo(message: string): void {
    this.alertSubject.next({
      message,
      type: AlertType.INFO
    });
  }

  clear(): void {
    this.alertSubject.next(null);
  }
}
