// global-alert.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertMode = 'success' | 'error' | 'info';

export interface AlertMessage {
  message: string;
  mode: AlertMode;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<AlertMessage | null>(null);
  alert$ = this.alertSubject.asObservable();

  show(message: string, mode: AlertMode = 'info') {
    this.alertSubject.next({ message, mode });
    setTimeout(() => this.clear(), 5000); // auto-dismiss after 5 seconds
  }

  clear() {
    this.alertSubject.next(null);
  }
}
