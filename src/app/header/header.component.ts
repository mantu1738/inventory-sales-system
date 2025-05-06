import { Component, Output, EventEmitter } from '@angular/core';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports:[CollapseModule]
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
}
