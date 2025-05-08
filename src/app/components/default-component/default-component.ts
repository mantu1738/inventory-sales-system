import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-default',
  imports: [CommonModule],
  template: `<div class="container mt-5">
  <div class="card shadow-lg border-0">
    <div class="card-body text-center py-5">
      <i class="fa fa-boxes fa-3x text-primary mb-4"></i>
      <h2 class="card-title mb-3">Welcome to the Inventory Management System</h2>
      <p class="fs-5 text-success">
        Welcome back, <strong>{{fullName}}</strong>!
      </p>
      <p class="text-muted">Use the sidebar to navigate and manage your inventory efficiently.</p>
    </div>
  </div>
</div>
`
})
export class DefaultComponent {
  fullName: string | undefined;
  constructor(private authService:AuthService) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.fullName = user.fullName;
      } else {
        this.fullName = undefined;
      }
    });
  }
}
