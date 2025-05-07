import { Component, OnInit } from '@angular/core';
import { Role, RoleDropDown } from '../../../core/models/role.model';
import { RoleService } from '../../../core/services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-role-action',
  templateUrl: './roles-action.component.html',
  imports: [FormsModule,CommonModule],
})
export class RoleActionComponent implements OnInit {
  role: Partial<Role> = {};
  permissionsInput = '';
  isEditMode = false;
  roleTypes = RoleDropDown;
  selectedPermissions = new Set<string>();
  readonly availablePermissions = [
    'user.manage',
    'role.manage',
    'item.manage',
    'sales.manage',
    'dashboard.view'
  ];


  constructor(
    private roleService: RoleService,
    private modalService:BsModalService
  ) {}

  ngOnInit(): void {

  }

  togglePermission(permission: string) {
    if (this.selectedPermissions.has(permission)) {
      this.selectedPermissions.delete(permission);
    } else {
      this.selectedPermissions.add(permission);
    }
  }

  onSubmit() {
    const payload = {
      ...this.role,
      permissions: Array.from(this.selectedPermissions),
    }


  }
}
