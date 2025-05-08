import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AlertType } from './alert.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => in', [
        style({
          transform: 'translateY(-20px)',
          opacity: 0
        }),
        animate('300ms ease-in')
      ]),
      transition('in => void', [
        animate('300ms ease-out', style({
          transform: 'translateY(0px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {
  message: string | null = null;
  type: AlertType = AlertType.SUCCESS;
  visible = false;
  animationState = 'void';

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe(alert => {
      if (alert) {
        this.message = alert.message;
        this.type = alert.type;
        this.showAlert();
      }
    });
  }

  showAlert(): void {
    this.visible = true;
    this.animationState = 'in';

    setTimeout(() => {
      this.closeAlert();
    }, 3000);
  }

  closeAlert(): void {
    this.animationState = 'void';
    setTimeout(() => {
      this.visible = false;
    }, 300);
  }

  getAlertClass(): string {
    switch (this.type) {
      case AlertType.SUCCESS:
        return 'alert-success';
      case AlertType.ERROR:
        return 'alert-danger';
      case AlertType.WARNING:
        return 'alert-warning';
      case AlertType.INFO:
        return 'alert-info';
      default:
        return 'alert-success';
    }
  }
}
