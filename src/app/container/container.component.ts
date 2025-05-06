import { Component } from "@angular/core";
import { SidemenuComponent } from "../sidemenu/sidemenu.component";
import { HeaderComponent } from "../header/header.component";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  imports:[SidemenuComponent,CollapseModule,RouterModule,CommonModule ],

})

export class ContainerComponent {
  constructor() {}
  isSidebarCollapsed = false;
  iconClassRight = 'fas fa-arrow-right'
  iconClassLeft = "fas fa-arrow-left";

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
