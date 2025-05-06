import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"],
  imports:[RouterModule,CommonModule,FormsModule ],

})

export class ContainerComponent {
  constructor(private authService:AuthService,private route:Router) {}
  openSidebar: boolean = true;

  menuSidebar = [
    {
    "icon": "fa-home",
    "name": "Home",
    "url": "/dashboard"
  },
  {
    "icon": "fa-area-chart",
    "name": "Items",
    "url": "/items"
  },
  {
    "icon": "fa-users",
    "name": "Users",
    "url": "/users"
  },
  {
    "icon": "fa-briefcase",
    "name": "Roles",
    "url": "/roles"
  },
  {
    "icon": "fa-cart-shopping",
    "name": "Sales",
    "url": "/sales"
  }
  ]

  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  logout()
  {
    this.authService.logout();
    this.route.navigate(['/login']);
  }

}
