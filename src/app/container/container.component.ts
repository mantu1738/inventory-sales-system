import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"],
  imports: [RouterModule, CommonModule, FormsModule],

})

export class ContainerComponent {
  openSidebar: boolean = true;

  menuSidebar = [
    {
    "icon": "fa-boxes",
    "name": "Dashboard",
    "url": "/dashboard",
    "permission": 'dashboard.view'
  },
  {
    "icon": "fa-area-chart",
    "name": "Items",
    "url": "/items",
    "permission": 'item.manage'
  },
  {
    "icon": "fa-users",
    "name": "Users",
    "url": "/users",
    "permission": 'user.manage'
  },
  {
    "icon": "fa-briefcase",
    "name": "Roles",
    "url": "/roles",
    "permission": 'role.manage'
  },
  {
    "icon": "fa-cart-shopping",
    "name": "Sales",
    "url": "/sales",
    "permission": 'sales.manage'
  }
  ]

  constructor(private authService:AuthService,private route:Router) {}

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  logout()
  {
    this.authService.logout();
    this.route.navigate(['/login']);
  }

  hasPermission(permission: string): Observable<boolean> {
    return this.authService.hasPermission(permission);
  }

}
