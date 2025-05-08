import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-cred',
  template: `<div class="container mt-4">
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title text-center mb-4">Default Credentials</h5>
      <div class="mb-4">
        <h6 class="text-primary">Super Admin</h6>
        <p class="mb-1"><strong>Username:</strong> super-admin</p>
        <p><strong>Password:</strong> admin123</p>
      </div>
      <div class="mb-4">
        <h6 class="text-secondary">Admin</h6>
        <p class="mb-1"><strong>Username:</strong> admin</p>
        <p><strong>Password:</strong> admin123</p>
      </div>

      <div class="mb-4">
        <h6 class="text-success">Supervisor</h6>
        <p class="mb-1"><strong>Username:</strong> supervisor</p>
        <p><strong>Password:</strong> supervisor123</p>
      </div>

      <div class="mb-4">
        <h6 class="text-warning">Sales Person</h6>
        <p class="mb-1"><strong>Username:</strong> sales</p>
        <p><strong>Password:</strong> sales123</p>
      </div>

      <p class="text-muted text-center mt-4">For demo purposes, you can use the above credentials to log in.</p>
    </div>
  </div>
</div>
`
})

export class DeafultCredComponent {
  // This component is a placeholder for default credentials information.
  // It can be expanded with more functionality or styling as needed.
}
