import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
  imports: [CommonModule],
})
export class SidemenuComponent {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',

    },
    {
      icon: 'fas fa-cog',
      label: 'Logout',
      isOpen: false,
      // children: [
      //   { icon: 'fas fa-log', label: 'Logout' },
      // ]
    },
    // {
    //   icon: 'fas fa-envelope',
    //   label: 'Messages'
    // }
  ];

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    // Only toggle if sidebar is not collapsed and item has children
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}
